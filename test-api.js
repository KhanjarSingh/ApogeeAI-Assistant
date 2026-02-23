require("dotenv").config();
const { routeAI } = require("./integrations/aiRouter");
async function test() {
    try {
        console.log("Testing Groq...");
        const groq = await routeAI("Hello", "groq");
        console.log("Groq:", groq);
    } catch(e) { console.error("Groq Fail:", e); }
    try {
        console.log("Testing Gemini...");
        const gemini = await routeAI("Hello", "gemini");
        console.log("Gemini:", gemini);
    } catch(e) { console.error("Gemini Fail:", e); }
}
test();
