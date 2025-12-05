const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const connectDB = require("../config/db");

require("dotenv").config();

// stripe init moved to handler

router.post("/create-payment-intent", async (req, res) => {
    try {
        await connectDB();

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("STRIPE_SECRET_KEY is missing!");
            return res.status(500).json({ error: "Stripe key is missing in server environment" });
        }

        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
        const { amount } = req.body;
        console.log("Creating payment intent for amount:", amount);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in subunits (e.g., paise for INR)
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
