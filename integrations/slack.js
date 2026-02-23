const axios = require("axios");

async function sendSlackMessage(channel, text) {
    await axios.post("https://slack.com/api/chat.postMessage", {
        channel,
        text
    }, {
        headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
            "Content-Type": "application/json"
        }
    });
}

module.exports = { sendSlackMessage };