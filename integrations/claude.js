const { Anthropic } = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askClaude(prompt) {
    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt }]
        });
        return msg.content[0].text;
    } catch (error) {
        console.error("Error calling Claude:", error);
        return "I'm sorry, I couldn't process your request with Claude.";
    }
}

module.exports = { askClaude };
