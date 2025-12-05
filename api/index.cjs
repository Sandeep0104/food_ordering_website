const app = require("../server/index.cjs");

module.exports = (req, res) => {
    // Vercel serverless function entry
    app(req, res);
};
