import React, { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/cartContext";
import { InputContext } from "../context/inputContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import axios from "axios";

function Payment({ nextStep, backStep }) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2500);
    }
  };
  const CARD_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  const [cart, setCart] = useContext(CartContext);
  const [input, setInput] = useContext(InputContext);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("item")) || []
  );
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: input.email,

        name: input.firstname + input.lastname,
      },
    });

    if (!error) {
      console.log("token", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: totalPrice,
            email: input.email,
            name: input.firstname + input.lastname,
            id: id,
          }
        );
        if (response) {
          console.log("payment success");
          nextStep();
          setCartItems([]);
          setCart(cartItems);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error.message);
    }
  };

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  useEffect(() => {
    setCart(cartItems);

    localStorage.setItem("item", JSON.stringify(cartItems));

    console.log("data:", input);
  }, []);

  //const result = Object.keys(input).map((value) => input[value]);
  //const result = Object.values(input);

  //console.log(result);

  return (
    <div>
      <p class="text-lg font-medium text-black">
        {" "}
        Bonjour {input.firstname} {input.lastname} voici le bilan de votre
        commande
      </p>

      <div>
        <ul className="ul">
          <li
            class="text-lg text-black font-medium"
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Votre numéro de table :{input.select}
          </li>
        </ul>
        {cartItems.map((cart) => (
          <ul
            className="ul"
            key={cart.id}
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <li>{cart.name}</li>
            <li>{cart.price} €</li>
          </ul>
        ))}

        <div>
          <span className="spann">
            Prix Total :<strong>{totalPrice} €</strong>
          </span>
        </div>
      </div>

      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <CardElement options={CARD_OPTIONS} />
        <br />
        <Box sx={{ m: 1, position: "relative" }}>
          <button
            variant="contained"
            disabled={loading}
            onClick={handleButtonClick}
            type="submit"
            disabled={!stripe}
            className="button-check"
          >
            Pay {totalPrice} €
          </button>
          {loading && <CircularProgress />}
        </Box>
      </form>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button className="button-check-next" onClick={backStep}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default Payment;
