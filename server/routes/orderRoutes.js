const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const connectDB = require("../config/db");

// Create a new Order
router.post("/", async (req, res) => {
    try {
        await connectDB();
        const { items, amount } = req.body;

        const newOrder = new Order({
            items,
            amount,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all Orders
router.get("/", async (req, res) => {
    try {
        await connectDB();
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
