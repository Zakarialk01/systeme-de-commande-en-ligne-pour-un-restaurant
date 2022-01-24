import React, { useContext } from "react";
import Stepper from "@material-ui/core/Stepper";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { InputContext } from "../../context/inputContext";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./style";
// Original module with no default theme

import Details from "../details";
import Payment from "../payment";

const Steps = ["Info", "Payment"];
function Check({ activeStep, setActiveStep, order, setOrder }) {
  const [activeStepCheck, setActiveStepCheck] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [input, setInput] = useContext(InputContext);

  const nextStep = () =>
    setActiveStepCheck((prevActiveStepCheck) => prevActiveStepCheck + 1);
  const backStep = () =>
    setActiveStepCheck((prevActiveStepCheck) => prevActiveStepCheck - 1);

  const back = () => {
    setActiveStep(2);
  };

  const backToMenu = () => {
    setActiveStep(1);
  };
  // we will passe it as a prop in adresssform
  const totalSteps = () => {
    return Steps.length;
  };

  const classes = useStyles();
  const Form = () => {
    if (activeStepCheck === 0) {
      return <Details back={back} nextStep={nextStep} backStep={backStep} />;
    } else if (activeStepCheck == 1) {
      return <Payment backStep={backStep} nextStep={nextStep} />;
    } else if (activeStepCheck == 2) {
      return <Confirmation backStep={backStep} nextStep={nextStep} />;
    }
  };

  const Confirmation = () => {
    return (
      <>
        <h1>
          Merci pour votre commande {input.firstname} {input.lastname}{" "}
        </h1>
        <br />
        <button className="button-check-next" onClick={backToMenu}>
          Retour vers le menu
        </button>
      </>
    );
  };
  return (
    <>
      <>
        <a
          href="https://wa.me/33659577133"
          class="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa fa-whatsapp whatsapp-icon"></i>
        </a>

        <CssBaseline>
          <>
            {activeStepCheck == 0 && (
              <aside class="relative flex items-center justify-center h-12 px-3 bg-blue-900">
                <p class="text-sm font-medium text-gray-100">
                  Merci d'avoir sélectionner votre menu
                </p>

                <a
                  onClick={back}
                  class="absolute inset-y-0 text-white cursor-pointer right-0 items-center hidden px-8 bg-indigo-600 lg:inline-flex"
                >
                  <span class="ml-3 text-sm font-medium tracking-widest uppercase">
                    {" "}
                    Retour au menu
                  </span>
                </a>
              </aside>
            )}

            <div className={classes.tootlbar}>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography variant="h4" align="center">
                    Checkout ☑️
                  </Typography>
                  {activeStepCheck === Steps.length ? (
                    <strong>Ca va arriver 😜</strong>
                  ) : (
                    <strong>
                      Etape {activeStepCheck + 1} / {totalSteps()}{" "}
                    </strong>
                  )}
                  <Stepper
                    nonLinear
                    activeStepCheck={activeStepCheck}
                    className={classes.stepper}
                  >
                    {Steps.map((step, index) => (
                      <Step key={step} completed={completed[index]}>
                        <StepButton>{step}</StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStepCheck === Steps.length ? (
                    <Confirmation />
                  ) : (
                    <Form />
                  )}{" "}
                </Paper>
              </main>
            </div>
          </>
        </CssBaseline>
      </>
    </>
  );
}
export default Check;
