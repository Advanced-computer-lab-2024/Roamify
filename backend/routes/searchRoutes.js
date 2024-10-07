const express = require('express');
const router = express.Router();
const { searchPlaceActivityItinerary } = require('../controllers/searchController.js');

// Define the route to handle /api/search
router.get('/search', searchPlaceActivityItinerary);

module.exports = router;
