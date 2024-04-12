const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    const { messaging } = req.body.entry[0];

    // Assuming you have only one message
    const { sender, message } = messaging[0];

    try {
        const response = await generateResponse(message.text);

        await sendMessage(sender.id, response);

        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing message:', error);
        res.sendStatus(500);
    }
});

// GPT-3.5 function to generate response
async function generateResponse(input) {
    const gptResponse = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Specify the model you want to use
            prompt: input,
            max_tokens: 150,
        }),
    });

    const { choices } = await gptResponse.json();
    return choices[0].text.trim();
}

// Function to send message back to user
async function sendMessage(recipientId, messageText) {
    await fetch('https://graph.facebook.com/v12.0/me/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipient: { id: recipientId },
            message: { text: messageText },
            messaging_type: 'RESPONSE',
        }),
    });
}

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}`));