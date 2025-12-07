const mongoose = require("mongoose");

// Contact Schema (inline to avoid path issues in serverless)
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

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
            // Create a new Contact Message
            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const newContact = new Contact({ name, email, message });
            const savedContact = await newContact.save();
            return res.status(201).json({ success: true, contact: savedContact });
        }

        if (req.method === "GET") {
            // Get all Contact Messages
            const contacts = await Contact.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, contacts });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Contact API Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
