require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');
const cors = require("cors");
const path = require('path');
const fs = require('fs');

app.use(express.json());
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
app.use('/v2/', require('./v2/route'));

app.get('/spotlight.pdf', (req, res) => {
    const filePath = path.join(__dirname, 'pdf/text.pdf');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error sending file:', err);
            res.status(500).send('Could not send the file.');
        }
    });
});

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