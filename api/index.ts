require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');
const cors = require("cors");

const RapidAPIClient = require('@rapidapi/client');
const rapidAPIClient = new RapidAPIClient('fa540bc0-a04e-11ef-add5-79ef3c7abc15');

function verifyRapidAPIKey(req, res, next) {
  const rapidAPIKey = req.get('x-rapidapi-key');
  rapidAPIClient.validateKey(rapidAPIKey)
    .then(() => {
      next(); // Allow the request to proceed
    })
    .catch((err) => {
      res.status(401).json({ error: 'Invalid x-rapidapi-key' });
    });
}

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

app.post("/api/pargraph/summery", verifyRapidAPIKey, async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for summarization." });
        const result = await model.generateContent(`Summarize the following text in a concise paragraph:\n\n${req.body.content}. Provide only the summary paragraph without any introductory words or explanations.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate summary. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/paragraph/generate", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for paragraph generation" });
        const result = await model.generateContent(`Generate a single, well-constructed paragraph based on the following content:\n\n${req.body.content}. Provide only the paragraph text itself, without any introductory phrases or additional explanations.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a paragraph. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/title/generate", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for  title generation." });
        const result = await model.generateContent(`Generate four unique title suggestions for "${req.body.content}". Each title should use a different tone or format. Provide only the titles, without any introductory text or explanations.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a title. Please try again later." });

        // let title = result.response.candidates[0].content.parts[0].text
        //     .replace(/^.*?(title|titles)\s+(for|suggestion).*?:?\s*/i, '') // Remove "Titles for", "Title suggestion for", etc.
        //     .replace(/^#+\s*/, '') // Remove markdown headers like "##" or "#"
        //     .trim()
        //     .split("\n")[0]; // Only the first line
        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/caption/generate", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for caption generation" });
        const result = await model.generateContent(`Create a catchy and engaging social media caption based on the following content:\n\n${req.body.content}. Provide only the caption text without any additional explanations or introductory phrases.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a caption. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
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