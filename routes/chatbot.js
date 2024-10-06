const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Render the chatbot interface
router.get('/', (req, res) => {
  res.render('chatbot'); // Ensure you have a chatbot.ejs file to render
});

// Apply a rate limit to the chatbot route
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Handle chatbot API call with rate limiter
router.post('/', limiter, async (req, res) => {
  const userMessage = req.body.message; // Access the message from the request body

  // Check if userMessage is provided
  if (!userMessage) {
    return res.status(400).json({ message: 'Message is required' });
  }

  console.log('Received message:', userMessage); // Log received message for debugging

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure your OpenAI key is set in .env
        'Content-Type': 'application/json'
      }
    });

    // Get the AI's reply from the response
    const botReply = response.data.choices[0].message.content; 
    res.json({ message: botReply }); // Send back the bot's reply
  } catch (error) {
    console.error('Error with OpenAI API:', error); // Log the error details for debugging

    // Check for rate limit error from OpenAI
    if (error.response && error.response.status === 429) {
      return res.status(429).json({ message: 'OpenAI rate limit exceeded. Please try again later.' });
    }

    res.status(500).json({ message: 'Error processing request' }); // Generic error response
  }
});

module.exports = router;
