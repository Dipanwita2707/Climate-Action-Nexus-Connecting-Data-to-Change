const mongoose = require('mongoose');

const carbonFootprintSchema = new mongoose.Schema({
  energyConsumption: Number,
  transportation: Number,
  foodWaste: Number,
  totalFootprint: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CarbonFootprint', carbonFootprintSchema);
