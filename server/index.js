const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/stripe/charge", cors(), async (req, res) => {
  let { amount, id, email, name } = req.body;
  console.log("amount ", amount);
  console.log("id", id);
  console.log("email ", email);
  console.log("name ", name);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "EUR",

      receipt_email: email,

      description: name,

      payment_method: id,
      confirm: true,
    });
    console.log("payment", payment);
    res.json({
      message: "PAYEMENT successs",
      success: true,
    });
  } catch (error) {
    console.log("eror", error);
    res.json({
      message: "payment echoue",
      success: false,
    });
  }
});
app.listen(process.env.PORT || 8080, () => {
  console.log("server demare");
});
