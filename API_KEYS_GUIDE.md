# 🔑 Apogee Open Claw: API Key Acquisition Guide

To run your Open Claw Assistant, you need a few free API keys. Follow these quick steps to get everything set up in your `.env` file!

---

### 1. 🤖 Gemini API Key (`GEMINI_API_KEY`)
Google's Gemini model handles our primary AI routing.
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** on the left menu.
4. Create a new key and paste it into your `.env`.

### 2. ⚡ Groq API Key (`GROQ_API_KEY`)
Groq is a blazing-fast, free alternative for AI queries available in your assistant (e.g., `ask groq ...`).
1. Go to the [Groq Console](https://console.groq.com/).
2. Sign in or create an account.
3. Navigate to **API Keys** in the sidebar.
4. Click **"Create API Key"** and copy it to your `.env`.

### 3. ⏱️ Toggl Time Tracking Keys (`TOGGL_WORKSPACE_ID` & `TOGGL_API_KEY`)
1. Create a free account at [Toggl Track](https://track.toggl.com/).
2. **API Key**: Go to your **Profile settings** (bottom left avatar) -> **Profile Settings**. Scroll down to the bottom to find your "API Token".
3. **Workspace ID**: Check the URL while logged into Toggl (e.g., `track.toggl.com/timer/1234567`). The number at the end is your Workspace ID. Alternatively, go to Organization -> Settings -> Workspaces.

### 4. 💬 Slack Bot Token (`SLACK_BOT_TOKEN`)
1. Go to [Slack API Apps](https://api.slack.com/apps).
2. Click **Create New App** -> **From scratch**, name it "Apogee Assistant", and select your workspace.
3. Go to **OAuth & Permissions** (left menu).
4. Under "Scopes" -> "Bot Token Scopes", add `chat:write` and `app_mentions:read`.
5. Scroll up and click **Install to Workspace**.
6. Copy the **Bot User OAuth Token** (starts with `xoxb-`) into your `.env`.

*(Note: To enable Slack commands, you must also configure the Event Subscriptions webhook to point to your `ngrok` URL: `https://<ngrok-url>/slack`)*

### 5. 📧 Gmail Integration (`GMAIL_USER` & `GMAIL_APP_PASSWORD`)
To allow the app to send emails on your behalf, you need an "App Password" (regular passwords won't work for security reasons).
1. Go to your [Google Account Security settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned ON.
3. Use the search bar in your Google Account settings and search for **"App passwords"**.
4. Create a new app password (name it "Apogee").
5. Copy the 16-character generated password into your `.env` as `GMAIL_APP_PASSWORD`.
6. Set `GMAIL_USER` to your standard Gmail address.

---

### Final `.env` Example:
```env
GEMINI_API_KEY=AIzaSy...
GROQ_API_KEY=gsk_...
TOGGL_WORKSPACE_ID=1234567
TOGGL_API_KEY=a1b2c3d4...
SLACK_BOT_TOKEN=xoxb-123...
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```
