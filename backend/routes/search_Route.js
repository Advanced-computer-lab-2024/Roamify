const express = require('express');
const router = express.Router();
const { searchPlaceActivityItinerary } = require('../controllers/searchController.js');
router.get('/search', searchPlaceActivityItinerary);

module.exports = router;