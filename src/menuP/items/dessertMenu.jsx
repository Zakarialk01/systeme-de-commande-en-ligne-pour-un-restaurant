import React, { useContext } from "react";
import dessert from "../data/dessert.json";

import { CartContext } from "../../context/cartContext";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function DessertMenu({
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
  return (
    <>
      <div class="single-menu">
        <img src={image} />
        <div class="menu-content">
          <h4>
            {name}
            <span>{price} €</span>
          </h4>
          <p>{description}</p>
          <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default DessertMenu;
