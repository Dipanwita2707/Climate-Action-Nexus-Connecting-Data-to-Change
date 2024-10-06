const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch air quality data from EPA AQS API
router.get('/', async (req, res) => {
  const apiKey = process.env.AQS_API_KEY; // API key stored in .env
  const email = process.env.AQS_API_EMAIL;

  try {
    const response = await axios.get('https://aqs.epa.gov/data/api/dailyData/byState', {
      params: {
        email: email,
        key: apiKey,
        param: '88101', // Example: PM2.5
        bdate: '20230101', // Begin date
        edate: '20230131', // End date
        state: '06' // California
      }
    });

    const data = response.data;
    res.render('aqsData', { data: data });
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    res.status(500).send('Error fetching air quality data');
  }
});

module.exports = router;
