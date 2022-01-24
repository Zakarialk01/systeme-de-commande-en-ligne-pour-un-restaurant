import React, { useState, useEffect } from "react";

export const InputContext = React.createContext();
export const InputProvider = (props) => {
  const [input, setInput] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("item");
    if (data) {
      setInput(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(input)); //set in local storage (affichage )
  }, [input]);
  return (
    <InputContext.Provider value={[input, setInput]}>
      {props.children}
    </InputContext.Provider>
  );
};
