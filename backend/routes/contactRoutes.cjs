const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.cjs");
const connectDB = require("../config/db.cjs");

// Create a new Contact Message
router.post("/", async (req, res) => {
    try {
        await connectDB();
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newContact = new Contact({
            name,
            email,
            message,
        });

        const savedContact = await newContact.save();
        res.status(201).json({ success: true, contact: savedContact });
    } catch (error) {
        console.error("Contact API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all Contact Messages
router.get("/", async (req, res) => {
    try {
        await connectDB();
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
