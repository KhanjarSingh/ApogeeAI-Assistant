const axios = require("axios");

async function startTimer(description) {
    await axios.post(
        "https://api.track.toggl.com/api/v9/time_entries",
        {
            created_with: "OpenClaw Productivity Assistant",
            description: description,
            workspace_id: parseInt(process.env.TOGGL_WORKSPACE_ID),
            duration: -1,
            start: new Date().toISOString()
        },
        {
            auth: {
                username: process.env.TOGGL_API_KEY,
                password: "api_token"
            }
        }
    );
}

module.exports = { startTimer };