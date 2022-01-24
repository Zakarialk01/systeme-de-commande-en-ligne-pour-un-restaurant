import React, { useState, useEffect, useContext } from "react";
import pizza from "../data/pizza.json";
import { CartContext } from "../../context/cartContext";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function PizzaMenu({
  choice,
  error,
  image,
  price,
  name,
  description,
  handleSubmit,
}) {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    const menu = {
      name: name,
      price: price,
      description: description,
      image: image,
    };
    setCart((curr) => [...curr, menu]);
  };
  console.log(cart);
  return (
    <>
      <div class="single-menu">
        <img src={image} />
        <div class="menu-content">
          <h4>
            {name}
            <span>{price} €</span>
          </h4>
          <p class="text-lg font-medium text-black">{description}</p>
          <form onSubmit={handleSubmit}>
            {/*} <input
                    style={{
                      height: "30px",
                      width: "15px",
                    }}
                    value={item.name}
                    name={item.price}
                    onChange={handleCheckbox}
                    type="checkbox"
                  ></input>*/}
            <button onClick={addToCart} className="add-button">
              Ajouter{"   "}
              <Badge color="secondary">
                <ShoppingCartIcon
                  style={{
                    color: "white",
                  }}
                />
              </Badge>
            </button>
          </form>
        </div>
      </div>

      <br />
    </>
  );
}

export default PizzaMenu;
