
import express from "express";

const router = express.Router();
require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51M3dwME1vH1H0ffZI3E1nLs816wFMbAOiGpVH3nMh5fpYdk9Tnv794Fwy3VhG8lBZBtiptV0OfElr08yy8HPQMPi00AThVbCdv"
);
// const app = express();
// const Port = 8000;

// app.use(cors());
// app.use(express.json());

router.post("/payment", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "THB",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret,
    });
  } catch (error) {
    console.log(error);
  }
});

// app.listen(Port, () => {
//   console.log(`Server listening on port ${Port}`);
// });

export default router;
