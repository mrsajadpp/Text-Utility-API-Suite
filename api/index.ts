require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"] // Allow specific headers
}));

app.get('/ping', (req, res) => {
    res.status(200).send({
        message: 'Hello world',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.use('/v1/', require('./v1/route'));

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