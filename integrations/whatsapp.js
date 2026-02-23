app.post("/whatsapp", async (req, res) => {
    const message = req.body.Body;
    const response = await routeAI(message);
    res.send(`<Response><Message>${response}</Message></Response>`);
});