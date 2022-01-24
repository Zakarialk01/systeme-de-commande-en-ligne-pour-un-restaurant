import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Menu from "./menuP/menu";
import Check from "./checkoutForm/checkout/check";
import Cart from "./context/cart";
function Checkout({ addToCart, cartItems }) {
  const [activeStep, setActiveStep] = useState(1);
  const [choice, setChoice] = useState([]);
  const [order, setOrder] = React.useState({});

  const next = () => {
    setActiveStep(2);
  };
  const back = () => {
    if (activeStep == 2) {
      setActiveStep(1);
    }
  };
  return (
    <div>
      <Navbar
        back={back}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        cartItems={cartItems}
      />
      <br /> <br /> <br /> <br />
      {activeStep == 1 && <Menu addToCart={addToCart} setActiveStep={next} />}
      {activeStep == 2 && (
        <Cart activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
      {activeStep == 3 && (
        <Check
          choice={choice}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          order={order}
          setOrder={setOrder}
        />
      )}
    </div>
  );
}

export default Checkout;
