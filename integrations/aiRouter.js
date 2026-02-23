const { askGemini } = require("./gemini");
const { askClaude } = require("./claude");

async function routeAI(prompt, model = "gemini") {
    if (model.toLowerCase() === "claude") {
        return await askClaude(prompt);
    }
    return await askGemini(prompt);
}

module.exports = { routeAI };