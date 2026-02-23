const axios = require("axios");

async function askGemini(prompt) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error("Gemini API Rate Limit Exceeded (429)");
            return "Gemini API rate limit exceeded. Please try again in a moment.";
        }
        console.error("Error calling Gemini:", error.message || error);
        return "I'm sorry, I couldn't process your request with Gemini at this time.";
    }
}

module.exports = { askGemini };