require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { sendSlackMessage } = require("./integrations/slack");
const { startTimer, stopTimer } = require("./integrations/toggl");
const { routeAI } = require("./integrations/aiRouter");
const { sendEmail } = require("./integrations/gmail");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/slack", async (req, res) => {
    if (req.body.type === "url_verification") {
        return res.status(200).send(req.body.challenge);
    }

    if (req.headers["x-slack-retry-num"]) {
        return res.sendStatus(200);
    }

    const isEvent = req.body.event && req.body.event.type === "message";
    if (isEvent && req.body.event.bot_id) {
        return res.sendStatus(200);
    }

    const text = isEvent ? (req.body.event.text || "") : (req.body.text || "");
    const channel = isEvent ? req.body.event.channel : req.body.channel_id;

    console.log(`[Slack] Received message: "${text}" in channel: ${channel}`);

    if (!text || !channel) return res.sendStatus(200);


    res.sendStatus(200);


    (async () => {
        try {
            const lowerText = text.toLowerCase();
            console.log(`[Slack] Processing lowercase text: "${lowerText}"`);

            if (lowerText.includes("startwork")) {
                await startTimer("Slack Work Session");
                await sendSlackMessage(channel, "Toggl Timer Started!");
                console.log(`[Slack] Sent StartWork reply to ${channel}`);
            } else if (lowerText.includes("stopwork")) {
                await stopTimer();
                await sendSlackMessage(channel, "Toggl Timer Stopped!");
                console.log(`[Slack] Sent StopWork reply to ${channel}`);
            } else if (lowerText.includes("ask groq ")) {
                const question = text.substring(lowerText.indexOf("ask groq ") + 9);
                console.log(`[Slack] Asking Groq: "${question}"`);
                const response = await routeAI(question, "groq");
                await sendSlackMessage(channel, response);
                console.log(`[Slack] Sent Groq reply to ${channel}`);
            } else if (lowerText.includes("ask ")) {
                const question = text.substring(lowerText.indexOf("ask ") + 4);
                console.log(`[Slack] Asking Gemini: "${question}"`);
                const response = await routeAI(question, "gemini");
                console.log(`[Slack] Got Gemini response: "${response}"`);
                await sendSlackMessage(channel, response);
                console.log(`[Slack] Sent Gemini reply to ${channel}`);
            } else {
                console.log(`[Slack] Message did not match any commands: "${text}"`);

                if (req.body.event && (req.body.event.channel_type === "im" || text.includes("<@"))) {
                    await sendSlackMessage(channel, "I am here! To talk to me, try using commands like `ask [your question]`, `ask groq [your question]`, or `startwork`/`stopwork`.");
                }
            }
        } catch (error) {
            console.error("[Slack] Background Processing Error:", error.message || error);
        }
    })();
});

app.post("/whatsapp", async (req, res) => {
    const message = req.body.Body || "";

    const model = message.toLowerCase().startsWith("gemini") ? "gemini" : "groq";
    const prompt = message.toLowerCase().startsWith("gemini") ? message.substring(6).trim() : message;

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