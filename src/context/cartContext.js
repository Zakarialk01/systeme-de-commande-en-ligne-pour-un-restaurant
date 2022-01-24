import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();
export const CartProvider = (props) => {
  const [cart, setCart] = useState([], () => {
    const data = localStorage.getItem("item");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(cart)); //set in local storage (affichage )
  }, [cart]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
