const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/api/pargraph/summery", async (req, res) => {
    try {
        const { content, tone = "concise" } = req.body;
        if (!content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for summarization." });

        let toneInstruction = "";
        switch (tone.toLowerCase()) {
            case "short":
                toneInstruction = "Summarize the following text in a single, concise paragraph:";
                break;
            case "medium":
                toneInstruction = "Summarize the following text in a moderate-length paragraph, including key details:";
                break;
            case "long":
                toneInstruction = "Provide a detailed summary of the following text in a full paragraph:";
                break;
            case "brief":
                toneInstruction = "Summarize the text very briefly in a couple of sentences:";
                break;
            default:
                toneInstruction = "Summarize the following text concisely:";
        }

        const result = await model.generateContent(`${toneInstruction}:\n\n${content}. Provide only the summary paragraph without any introductory words or explanations.`);
        if (result?.response?.candidates[0]?.finishReason === 'SAFETY') {
            return res.status(400).json({
                error: "Safety Filter Triggered",
                message: "The content request was flagged by the safety filter. Please adjust the content and try again."
            });
        }
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0] || !result.response.candidates[0].content || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts[0].text) return res.status(500).json({ error: "Processing Error", message: "Failed to generate summary. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

router.post("/api/paragraph/generate", async (req, res) => {
    try {
        const { content, tone = "concise", style = "neutral" } = req.body;

        if (!content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for paragraph generation" });
        const result = await model.generateContent(`
            Generate a single, well-constructed paragraph based on the following content:
            \n\n${content}\n\n
            The paragraph should be written in a ${tone} tone and a ${style} style. 
            Provide only the paragraph text itself, without any introductory phrases or additional explanations.
        `);

        if (result?.response?.candidates[0]?.finishReason === 'SAFETY') {
            return res.status(400).json({
                error: "Safety Filter Triggered",
                message: "The content request was flagged by the safety filter. Please adjust the content and try again."
            });
        }

        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0] || !result.response.candidates[0].content || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts[0].text) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a paragraph. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

router.post("/api/title/generate", async (req, res) => {
    try {
        const { content, tone = "neutral", style = "general", context = "blog" } = req.body;
        if (!content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for  title generation." });
        const result = await model.generateContent(`
            Generate four unique title suggestions for "${content}". Each title should be suitable for ${context} content, using a distinct tone or format. 
            Tone: ${tone}. Style: ${style}.
            Provide only the titles in a JSON array format, with each title as a separate string in the array. Do not include any introductory text or explanations.
        `);

        if (result?.response?.candidates[0]?.finishReason === 'SAFETY') {
            return res.status(400).json({
                error: "Safety Filter Triggered",
                message: "The content request was flagged by the safety filter. Please adjust the content and try again."
            });
        }

        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0] || !result.response.candidates[0].content || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts[0].text) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a title. Please try again later." });

        const titles = JSON.parse(result.response.candidates[0].content.parts[0].text.trim());

        if (!Array.isArray(titles) || titles.length === 0) {
            return res.status(500).json({ error: "Processing Error", message: "The response was not in the expected format." });
        }

        res.status(200).json({ response: titles });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

router.post("/api/caption/generate", async (req, res) => {
    try {
        const { content, style = "engaging", context = "Instagram" } = req.body;

        if (!content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for caption generation" });
        const result = await model.generateContent(`Create a ${style} social media caption for ${context} based on the following content:\n\n${content}. Provide only the caption text without any additional explanations or introductory phrases.`);

        if (result?.response?.candidates[0]?.finishReason === 'SAFETY') {
            return res.status(400).json({
                error: "Safety Filter Triggered",
                message: "The content request was flagged by the safety filter. Please adjust the content and try again."
            });
        }

        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0] || !result.response.candidates[0].content || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts || !result.response.candidates[0].content.parts[0].text) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a caption. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Currently, we are experiencing a high volume of traffic. Please try to generate your request one more time."
        });
    }
});

module.exports = router;