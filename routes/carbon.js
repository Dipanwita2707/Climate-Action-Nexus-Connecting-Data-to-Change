const express = require('express');
const router = express.Router();
const CarbonFootprint = require('../models/CarbonFootprint');

// Carbon Footprint Form Route
router.get('/', (req, res) => {
  res.render('carbon');
});

// Handle form submission
router.post('/', async (req, res) => {
  const { energy, transportation, food } = req.body;
  const totalFootprint = parseFloat(energy) + parseFloat(transportation) + parseFloat(food);

  const carbonFootprint = new CarbonFootprint({
    energyConsumption: energy,
    transportation: transportation,
    foodWaste: food,
    totalFootprint: totalFootprint
  });

  await carbonFootprint.save();
  res.render('carbon-result', { totalFootprint });
});

module.exports = router;
