const { askGemini } = require("./gemini");
const { askGroq } = require("./groq");

async function routeAI(prompt, model = "groq") {
    if (model.toLowerCase() === "gemini") {
        return await askGemini(prompt);
    }
    return await askGroq(prompt);
}

module.exports = { routeAI };