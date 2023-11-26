const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

const API_KEYS = [
    "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",
    "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",
    "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",

];

const getRandomApiKey = () => {
    const randomIndex = Math.floor(Math.random() * API_KEYS.length);
    return API_KEYS[randomIndex];
};

app.use(express.json());

app.post("/generate-images", async(req, res) => {
    try {
        const apiKey = getRandomApiKey();

        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(req.body),
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});