const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            img: { type: String }
        }
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "Paid" }, // Assuming all orders coming here are already paid via Razorpay
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
