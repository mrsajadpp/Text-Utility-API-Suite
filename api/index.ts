require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');
const cors = require("cors");

app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"] // Allow specific headers
}));

app.use('/v1/', require('./v1/route'));
app.use('/v2/', require('./v2/route'));

app.get("*", (req, res) => res.status(404).json({
    error: "Not Found",
    message: "The requested API route does not exist."
}));

app.post("*", (req, res) => res.status(404).json({
    error: "Not Found",
    message: "The requested API route does not exist."
}));

app.listen(3003, () => console.log("Server ready on port 3002."));

module.exports = app;