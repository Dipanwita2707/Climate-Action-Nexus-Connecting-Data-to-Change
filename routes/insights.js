const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define your routes here
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://power.larc.nasa.gov/api/temporal/daily/point', {
      params: {
        parameters: 'T2M,PRECTOT',
        community: 'RE',
        longitude: -95.3698,
        latitude: 29.7604,
        start: '20230101',
        end: '20230131',
        format: 'JSON'
      }
    });

    const data = response.data.properties.parameter;
    const temperature = data.T2M;
    const precipitation = data.PRECTOT;

    res.render('insights', { temperature, precipitation });
  } catch (error) {
    console.error('Error fetching climate data:', error);
    res.status(500).send('Error fetching climate data');
  }
});

// Export the router
module.exports = router;
