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
    const text = req.body.text || "";

    if (text === "startwork") {
        await startTimer("Slack Work Session");
        await sendSlackMessage(req.body.channel_id, "Toggl Timer Started!");
    } else if (text.startsWith("ask groq ")) {
        const question = text.replace("ask groq ", "");
        const response = await routeAI(question, "groq");
        await sendSlackMessage(req.body.channel_id, response);
    } else if (text.startsWith("ask ")) {
        const question = text.replace("ask ", "");
        const response = await routeAI(question, "gemini");
        await sendSlackMessage(req.body.channel_id, response);
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