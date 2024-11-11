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

app.get("/ping", (req, res) => res.status(200).send("Hello world"));

app.post("/api/pargraph/summery", async (req, res) => {
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


// Chemical Tools

app.post("/api/chemical/reaction-completer", async (req, res) => {
    try {
        if (!req.body.reactants) return res.status(400).json({ error: "Invalid Request", message: "Reactants is required for completing reaction." });
        const result = await model.generateContent(`Predict the products of the following chemical reaction based on the provided reactants:\n\nReactants: ${req.body.reactants}. Provide only the product names and their molecular formulas, without any additional explanation or notes.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to process reaction. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/chemical/predict-property", async (req, res) => {
    try {
        if (!req.body.structure) return res.status(400).json({ error: "Invalid Request", message: "Molecule Structure is required for predict its chemical properties." });
        const result = await model.generateContent(`Analyze the molecular structure of the following compound and predict its chemical properties:\n\nMolecule Structure: ${req.body.structure}. Provide only key properties such as boiling point, melting point, solubility, and reactivity, formatted as a list.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to process reaction. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/chemical/predict-environment", async (req, res) => {
    try {
        if (!req.body.reaction) return res.status(400).json({ error: "Invalid Request", message: "Reaction is required for predict its environmental impact." });
        const result = await model.generateContent(`Evaluate the environmental impact of the given reaction and suggest eco-friendly alternatives or optimizations:\n\nReaction: ${req.body.reaction}. List only the impact factors and sustainable modifications in bullet points, without extra commentary.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to process reaction. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

app.post("/api/chemical/compound-compatibility", async (req, res) => {
    try {
        if (!req.body.compounds) return res.status(400).json({ error: "Invalid Request", message: "Compounds is required for predict its compatibility issues." });
        const result = await model.generateContent(`Check for compatibility issues between the following compounds when mixed or used in a reaction:\n\nCompounds: ${req.body.compounds}. Provide only compatibility insights or known reactions between these compounds in concise bullet points.`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to process reaction. Please try again later." });

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