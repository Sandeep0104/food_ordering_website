const app = require("../backend/index.cjs");

// Vercel serverless function entry point
// This handles all /api/* routes by passing them to the Express app
module.exports = (req, res) => {
    // The rewrite sends all /api/* requests here
    // Express app handles routing internally
    app(req, res);
};
