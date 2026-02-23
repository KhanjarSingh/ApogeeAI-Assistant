const { askGemini } = require("./gemini");
const { askGroq } = require("./groq");

async function routeAI(prompt, model = "gemini") {
    if (model.toLowerCase() === "groq") {
        return await askGroq(prompt);
    }
    return await askGemini(prompt);
}

module.exports = { routeAI };