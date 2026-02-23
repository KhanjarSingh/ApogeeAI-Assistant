require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { sendSlackMessage } = require("./integrations/slack");
const { startTimer } = require("./integrations/toggl");
const { routeAI } = require("./integrations/aiRouter");
const { sendEmail } = require("./integrations/gmail");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/slack", async (req, res) => {
    // 1. Handle Slack URL Verification Challenge
    if (req.body.type === "url_verification") {
        return res.status(200).send(req.body.challenge);
    }

    // 2. Identify if it's an Event Subscription or a Slash Command
    const isEvent = req.body.event && req.body.event.type === "message";

    // Ignore bot messages to prevent infinite loops
    if (isEvent && req.body.event.bot_id) {
        return res.sendStatus(200);
    }

    const text = isEvent ? (req.body.event.text || "") : (req.body.text || "");
    const channel = isEvent ? req.body.event.channel : req.body.channel_id;

    if (!text || !channel) return res.sendStatus(200);

    const lowerText = text.toLowerCase();

    if (lowerText.includes("startwork")) {
        await startTimer("Slack Work Session");
        await sendSlackMessage(channel, "Toggl Timer Started!");
    } else if (lowerText.includes("ask groq ")) {
        const question = text.substring(lowerText.indexOf("ask groq ") + 9);
        const response = await routeAI(question, "groq");
        await sendSlackMessage(channel, response);
    } else if (lowerText.includes("ask ")) {
        const question = text.substring(lowerText.indexOf("ask ") + 4);
        const response = await routeAI(question, "gemini");
        await sendSlackMessage(channel, response);
    }

    res.sendStatus(200);
});

app.post("/whatsapp", async (req, res) => {
    const message = req.body.Body || "";
    // Defaulting whatsapp to gemini, could use groq
    const model = message.toLowerCase().startsWith("groq") ? "groq" : "gemini";
    const prompt = message.toLowerCase().startsWith("groq") ? message.substring(5).trim() : message;

    const response = await routeAI(prompt, model);
    res.send(`<Response><Message>${response}</Message></Response>`);
});

app.post("/email", async (req, res) => {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
        return res.status(400).send("Missing required fields: to, subject, text");
    }

    const success = await sendEmail(to, subject, text);
    if (success) {
        res.status(200).send("Email sent successfully!");
    } else {
        res.status(500).send("Failed to send email");
    }
});

app.listen(3000, () => {
    console.log("Assistant Running on Port 3000");
});