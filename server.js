require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import route modules
const insightsRoutes = require('./routes/insights');
const carbonRoutes = require('./routes/carbon');
const gameRoutes = require('./routes/game');
const chatbotRoutes = require('./routes/chatbot');
const aqsDataRoutes = require('./routes/aqsData');

// Middleware setup
app.use('/insights', insightsRoutes);
app.use('/carbon', carbonRoutes);
app.use('/game', gameRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/aqsData', aqsDataRoutes);
app.set('view engine', 'ejs');
// Middleware setup
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
