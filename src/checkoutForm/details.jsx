import React, { useState, useEffect, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./checkout.css";
import { Link } from "react-router-dom";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { InputContext } from "../context/inputContext";
const tab = [1, 2, 3, 4, 5];
const Details = ({ back, nextStep }) => {
  const [input, setInput] = useContext(InputContext);

  const {
    methods,
    register,
    handleSubmit,
    watch,

    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();
    nextStep();
    setInput(data);
    console.log(input);
  };

  return (
    <div>
      <div>
        <Typography variant="h6" glutterBottom>
          Veuillez remplir le formulaire
        </Typography>
        <br />
        <br />

        {/*for that payment form know the previous step we should do onsubmit which we add next function in checkout and newtStep backStep */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="Login">
            <div className="flex2">
              <label>
                {" "}
                Votre prenom :
                <input
                  type="text"
                  placeholder="  Entrez votre prenom"
                  label="Votre prenom"
                  {...register("firstname", {
                    required: "merci d'entrer votre prenom",
                    message: "merci d'entrer votre prenom",
                  })}
                />
                {errors.firstname && <p>{errors.firstname.message}</p>}
              </label>

              <label>
                {" "}
                Votre nom :
                <input
                  type="text"
                  name="lastname"
                  placeholder="  Entrez votre nom"
                  label="Votre nom"
                  {...register("lastname", {
                    required: "merci d'entrez votre nom",
                    message: "merci d'entrez votre nom",
                  })}
                />
                {errors.lastname && <p>{errors.lastname.message}</p>}
              </label>
            </div>
            <div className="flex2">
              <label>
                {" "}
                Votre email :
                <input
                  type="email"
                  className="email"
                  name="email"
                  placeholder="  Entrez votre email"
                  label="Votre email"
                  {...register("email", {
                    required: "Merci d'entrer votre email",
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </label>
              <label>
                Le numéro de la table
                <select
                  className="select"
                  name="select"
                  fullWidth
                  {...register("select", {
                    required: "Merci de choisir une option",
                  })}
                >
                  <option value=""> Selectionnez le numéro de la table</option>
                  <option value="1"> 1</option>

                  <option value="2">2 </option>

                  <option>3 </option>

                  <option> 4</option>

                  <option>5 </option>
                  <option> 6</option>

                  <option>7 </option>
                  <option> 8</option>

                  <option>9 </option>
                </select>
                {errors.select && <p>{errors.select.message}</p>}
              </label>
            </div>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button className="button-check-next" onClick={back}>
                Retour
              </button>

              <button type="submit" className="button-check-back">
                {" "}
                {/*we add submit in form with reacthookform we do methode.handlesubmit...*/}
                Suivant
              </button>
              {/* <pre>{JSON.stringify(watch(), null, 2)}</pre>*/}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Details;
