const app = require("../backend/index.cjs");

module.exports = (req, res) => {
    // Vercel serverless function entry
    app(req, res);
};
