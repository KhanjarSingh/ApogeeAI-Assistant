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

async function stopTimer() {
    try {
        // 1️⃣ Get current running time entry
        const current = await axios.get(
            "https://api.track.toggl.com/api/v9/me/time_entries/current",
            {
                auth: {
                    username: process.env.TOGGL_API_KEY,
                    password: "api_token"
                }
            }
        );

        if (!current.data) {
            console.log("⚠ No running timer found.");
            return;
        }

        const timeEntryId = current.data.id;

        // 2️⃣ Update duration instead of using /stop
        const now = new Date();
        const startTime = new Date(current.data.start);
        const duration = Math.floor((now - startTime) / 1000);

        await axios.put(
            `https://api.track.toggl.com/api/v9/workspaces/${process.env.TOGGL_WORKSPACE_ID}/time_entries/${timeEntryId}`,
            {
                workspace_id: parseInt(process.env.TOGGL_WORKSPACE_ID),
                duration: duration,
                start: current.data.start,
                created_with: "OpenClaw Productivity Assistant"
            },
            {
                auth: {
                    username: process.env.TOGGL_API_KEY,
                    password: "api_token"
                }
            }
        );

        console.log("Timer stopped successfully");

    } catch (error) {
        console.error("Stop Timer Error:", error.response?.data || error.message);
    }
}
module.exports = { startTimer, stopTimer };