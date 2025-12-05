const app = require("../server/index");

module.exports = (req, res) => {
    // Vercel serverless function entry
    app(req, res);
};
