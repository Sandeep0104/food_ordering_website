const mongoose = require("mongoose");

// Order Schema (inline to avoid path issues in serverless)
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
    status: { type: String, default: "Paid" },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// MongoDB connection with caching for serverless
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        await connectDB();

        if (req.method === "POST") {
            // Create a new Order
            const { items, amount } = req.body;
            const newOrder = new Order({ items, amount });
            const savedOrder = await newOrder.save();
            return res.status(201).json({ success: true, order: savedOrder });
        }

        if (req.method === "GET") {
            // Get all Orders
            const orders = await Order.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, orders });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Order API Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
