const { askGemini } = require("./gemini");

async function routeAI(prompt) {
    return await askGemini(prompt);
}

module.exports = { routeAI };