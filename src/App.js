import React from "react";
import Checkout from "./checkout";
import Acceuil from "./Acceuil";

import Cart from "./context/cart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import { InputProvider } from "./context/inputContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const PUBLIC_KEY =
  "pk_test_51Hz8DjAassQnrpItGq1T8MNR8ymTzdGuKOl4yt5KsjJJ3WVdarprkuPVjRz6JhGhNwMYZLCLL3LuqGmqjZD5xzsV00cnb1zM8y";
const stripePromise = loadStripe(PUBLIC_KEY);
function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Acceuil />
              </Route>
              <Elements stripe={stripePromise}>
                <InputProvider>
                  <Route exact path="/Menu">
                    <Checkout />
                  </Route>
                </InputProvider>
              </Elements>
              <Route exact path="/Cart">
                <Cart />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
