import React, { useContext } from "react";
import "./navbar.css";
import { useLocation, withRouter, Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "./context/cart";
import { CartContext } from "./context/cartContext";
import pizza from "./menuP/data/pizza.json";
function Navbar({ back, activeStep, setActiveStep }) {
  const [cart, setCart] = useContext(CartContext);

  const location = useLocation();
  const viewCart = () => {
    setActiveStep(2);
  };
  var price = pizza.data.price;

  const { pricee } = cart.map((item) => ({
    price: item.price,
  }));
  const totalPrice = ({ pricee }) => {
    cart.reduce((acc, curr) => acc + curr.pricee, 0);
  };

  console.log(totalPrice);

  return (
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header" data-aos="zoom-in" data-aos-duration="1500">
        <div style={{ marginLeft: "30px" }} class="nav-title">
          <a href="#" style={{ textDecoration: "none", color: "aliceblue" }}>
            Le Supreme
          </a>
          <i class="fa fa-food"></i>
        </div>
      </div>

      {location.pathname === "/Menu" ? (
        <div class="nav-links">
          {activeStep == 1 && (
            <>
              <Box sx={{ color: "action.active" }}>
                <Badge
                  badgeContent={cart.length}
                  color="secondary"
                  style={{ marginTop: "15px", marginRight: "1rem" }}
                >
                  <ShoppingCartIcon
                    onClick={viewCart}
                    style={{
                      color: "white",
                      fontSize: "30px",
                    }}
                  />
                </Badge>
              </Box>
            </>
          )}
          {activeStep == 2 && (
            <button className="button-navbar" onClick={back}>
              {" "}
              <i
                style={{ textDecoration: "none", color: "white" }}
                class="	fa fa-chevron-circle-left"
              >
                {" "}
              </i>{" "}
              {"   "}Retour
            </button>
          )}
        </div>
      ) : (
        <div class="nav-links" id="top">
          <div class="dropdown"></div>
        </div>
      )}
    </div>
  );
}

export default withRouter(Navbar);
