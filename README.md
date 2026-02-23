# Apogee AI Assistant

Apogee AI Assistant is a Node.js-based backend application designed to integrate artificial intelligence and productivity tools into external communication platforms like Slack, WhatsApp, and Email. 

## Features

* **Slack Integration**: 
  * Listen for and respond to Slack messages.
  * Start and stop Toggl time tracking timers (`startwork`, `stopwork`).
  * Query AI models for answers (`ask [question]` for Gemini and `ask groq [question]` for Groq).
* **WhatsApp Integration**: 
  * Reply to WhatsApp messages utilizing AI models. By default it uses Groq, but prefixing the message with `gemini` routes the query to the Gemini model.
* **Email Integration**: 
  * Send emails via Gmail using a dedicated `/email` HTTP POST endpoint.

## Technologies Used

* **Node.js** & **Express**: For the core server and API routing.
* **Axios**: For making HTTP requests to external APIs (like Slack and Toggl).
* **AI Models**:
  * **Groq SDK** (`groq-sdk`): For high-speed AI inference.
  * **Gemini** (Google AI): Integrated for advanced and versatile querying.
* **Nodemailer**: For reliable email delivery via Gmail.

## Project Structure

```text
Apogee/
├── .env                # Environment variables (API keys, secrets)
├── package.json        # Project metadata and dependencies
├── server.js           # Main Express server and route handlers
└── integrations/       # Service-specific integration modules
    ├── aiRouter.js     # Routes prompts between Gemini and Groq models
    ├── gemini.js       # Gemini API integration wrapper
    ├── gmail.js        # Nodemailer setup and email sending logic
    ├── groq.js         # Groq API integration wrapper
    ├── slack.js        # Logic for sending messages back to Slack
    ├── toggl.js        # Toggl time tracking API wrapper
    └── whatsapp.js     # WhatsApp integration helpers
```

## Setup & Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd Apogee
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the necessary secret keys (e.g., Slack Tokens, Toggl API Key, Groq API Key, Gemini Key, Gmail App Passwords, etc.). 

4. **Run the Application**:
   ```bash
   node server.js
   ```
   The assistant server will start running on port `3000`.

## API Endpoints

* `POST /slack`: Webhook endpoint for receiving Slack events.
* `POST /whatsapp`: Webhook endpoint for receiving WhatsApp messages.
* `POST /email`: Endpoint to send emails. Requires a JSON payload:
  ```json
  {
      "to": "recipient@example.com",
      "subject": "Subject Here",
      "text": "Body content here"
  }
  ```

## License
ISC
