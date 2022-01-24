import React, { useState, useEffect, useContext } from "react";
import "./menu.css";
import pizza from "./data/pizza.json";
import burger from "./data/burger.json";
import dessert from "./data/dessert.json";
import Burger from "./items/burgerMenu";
import Pizza from "./items/pizzaMenu";
import Dessert from "./items/dessertMenu";
import { CartContext } from "../context/cartContext";
import { Link, withRouter } from "react-router-dom";
function Menu({ setActiveStep }) {
  const [isChecked, setIsChecked] = useState(false);
  const [active, setActive] = useState("pizza");
  const [error, setError] = useState("");
  const [choice, setChoice] = useState([]);
  const [praise, setPraise] = useState("veuillez selectionner votre repas");
  const [checkedValue, setcheckedValue] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const nextClickHandler = () => {
    /*if (!isChecked) {
      setActiveStep();
      return setPraise("Merci d'avoir choisi le menu");
    } else {
      setError("Vous devez dabord choisir le menu");
    }*/
    if (cart.length) {
      setActiveStep();
      return setPraise("Merci d'avoir choisi le menu");
    } else {
      setError("Vous devez dabord choisir le menu");
    }
  };
  const setColor = (active) => {
    if (active == "pizza") {
      return "green";
    } else {
      return "yellow";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <a class="back-to-top" href="#top">
        <i class="fa fa-arrow-up  whatsapp-icon"></i>
      </a>
      <section>
        <div class="max-w-screen-xl px-4 py-10 mx-auto sm:px-6  lg:px-8">
          <div class="max-w-3xl mx-auto text-center ">
            <h1 class="text-xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
              Composez Votre Menu
            </h1>
          </div>
        </div>
      </section>
      <div className="but">
        <button
          className={`tag  ${setColor(active)}   `}
          onClick={() => setActive("pizza")}
        >
          Entrées🧆{" "}
        </button>

        <button onClick={() => setActive("burger")}>Plats 🍲</button>
        <button onClick={() => setActive("dessert")}>Desserts🍨</button>
      </div>
      {active == "pizza" && (
        <div class="wrapper" id="menu">
          <div class="menu">
            {pizza.data.map((item, index) => (
              <Pizza
                confirm={nextClickHandler}
                handleSubmit={handleSubmit}
                choice={choice}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkedValue={checkedValue}
                error={error}
                praise={praise}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
              />
            ))}
            {error && (
              <div class="alert">
                <p style={{ color: "white" }}>
                  {"    "}
                  <i
                    style={{ color: "white   " }}
                    class="fa fa-exclamation-triangle"
                  >
                    {" "}
                  </i>
                  {"      "}
                  {error}{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {active == "burger" && (
        <div class="wrapper" id="menu">
          <div class="menu">
            {burger.data.map((item, index) => (
              <Burger
                confirm={nextClickHandler}
                handleSubmit={handleSubmit}
                choice={choice}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkedValue={checkedValue}
                error={error}
                praise={praise}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
              />
            ))}
            {error && (
              <div class="alert">
                <p style={{ color: "white" }}>
                  {"    "}
                  <i
                    style={{ color: "white   " }}
                    class="fa fa-exclamation-triangle"
                  >
                    {" "}
                  </i>
                  {"      "}
                  {error}{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {active == "dessert" && (
        <div class="wrapper" id="menu">
          <div class="menu">
            {dessert.data.map((item, index) => (
              <Dessert
                confirm={nextClickHandler}
                handleSubmit={handleSubmit}
                choice={choice}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkedValue={checkedValue}
                error={error}
                praise={praise}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
              />
            ))}
            {error && (
              <div class="alert">
                <p style={{ color: "white" }}>
                  {"    "}
                  <i
                    style={{ color: "white   " }}
                    class="fa fa-exclamation-triangle"
                  >
                    {" "}
                  </i>
                  {"      "}
                  {error}{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <button className="button" onClick={nextClickHandler}>
          Confirmer
        </button>
      </div>
    </>
  );
}

export default withRouter(Menu);
