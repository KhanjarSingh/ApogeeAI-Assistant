const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function askGroq(prompt) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192", // Using a fast, free model
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error("Error calling Groq:", error);
        return "I'm sorry, I couldn't process your request with Groq at this time.";
    }
}

module.exports = { askGroq };
