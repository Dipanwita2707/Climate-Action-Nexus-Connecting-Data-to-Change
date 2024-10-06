const express = require('express');
const router = express.Router();

// Route for the climate game
router.get('/', (req, res) => {
  res.render('game');
});

// Export the router
module.exports = router;
