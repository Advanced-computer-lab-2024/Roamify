const express = require('express');
const router = express.Router();
const { filterUpcomingItineraries } = require('../controllers/filterController.js');
router.get('/itineraries/filter', filterUpcomingItineraries);

module.exports = router;
