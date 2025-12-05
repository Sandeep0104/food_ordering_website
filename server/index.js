const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Connect DB
// Connect DB lazily in routes that need it
// connectDB();

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Health Check that bypasses DB/Helpers
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    // Eager connect for local development
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
