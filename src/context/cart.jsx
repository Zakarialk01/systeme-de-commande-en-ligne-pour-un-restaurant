import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import Button from "@material-ui/core/Button";
import "./cart.css";
import emptyy from "./chef.png";
import pizza from "../menuP/data/pizza.json";

function Cart({ setActiveStep }) {
  const [cart, setCart] = useContext(CartContext);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("item")) || []
  );

  const removeFromCart = (id) => {
    /* const newCart = cartItems.splice(1);
    setCartItems(newCart);
    localStorage.setItem("item", JSON.stringify(newCart));
    console.log(cart);*/

    /*const newCart = cart.splice(i, 1);
    console.log(newCart);
    setCart(newCart);*/
    setCartItems(cartItems.filter((item) => item !== id));
    /*setCartItems(cartItems.filter((item) => item !== itemToRemove));*/
    setCart(cart.filter((item) => item !== id));

    localStorage.removeItem(cart);
    console.log(cart);
  };
  const empty = () => {
    setCartItems([]);
    setCart([]);
  };
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const next = () => {
    setActiveStep(3);
  };

  const back = () => {
    setActiveStep(1);
  };

  useEffect(() => {
    setCart(cartItems);
    localStorage.setItem("item", JSON.stringify(cartItems));
  }, []);
  const EmptyCart = () => {
    return (
      <div className="emptycart" id="#">
        <div>
          <Button
            style={{ margin: "0 auto", display: "block", fontWeight: "700" }}
            onClick={back}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Choisir le menu 🍲
          </Button>
          <img className="image-error" src={emptyy} />
        </div>
      </div>
    );
  };
  const RenderCartItems = () => {
    return (
      <>
        {cartItems.length > 2 && (
          <a class="back-to-top" href="#top">
            <i class="fa fa-arrow-up  whatsapp-icon"></i>
          </a>
        )}

        <section>
          <div class="max-w-screen-xl px-4 py-5 mx-auto sm:px-8  lg:px-8">
            <div class="max-w-xl mx-auto text-center ">
              <h1 class="text-xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                Votre Menu
              </h1>
            </div>
          </div>
        </section>

        <div class="p-8 space-y-4 border border-gray-100 shadow-xl rounded-xl">
          {cartItems.map((item) => (
            <div class="flow-root" key={item.id}>
              <ul class="-my-4 divide-y divide-gray-100">
                <li class="flex items-center py-4 border-t border-gray-300">
                  <a href="" class="flex-shrink-0">
                    <img className="image" src={item.image} />
                  </a>

                  <div class="flex-1 ml-3">
                    <a href="" class="block text-lg font-medium">
                      {item.name}
                    </a>

                    <p class="text-lg text-gray-500">Qt:1</p>
                  </div>

                  <div class="flex items-center ml-3">
                    <p class=" font-medium text-xl">{item.price} €</p>

                    <a
                      class="flex-shrink-0 inline-block p-3 ml-6 text-black bg-gray-300 rounded-full  hover:bg-red-600 hover:text-white"
                      onClick={() => removeFromCart(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          ))}
          <h1 class="text-center text-2xl font-semibold text-indigo-800">
            total price : {totalPrice} €
          </h1>
          <div class="flex pt-4 space-x-4 border-t border-gray-300">
            <a
              onClick={empty}
              class="inline-block px-5 py-3 text-xs font-medium  cursor-pointer tracking-wide text-center text-white uppercase bg-red-600 rounded"
            >
              Empty
            </a>

            <a
              onClick={next}
              class="flex-1 inline-block px-5 py-3 text-xs font-medium tracking-wide text-center  cursor-pointer text-white uppercase bg-indigo-600 rounded"
            >
              Checkout
            </a>
          </div>
        </div>
      </>
    );
  };
  return <>{cart.length === 0 ? <EmptyCart /> : <RenderCartItems />}</>;
}

export default Cart;
