const express = require('express');
const router = express.Router();
const { showallItineraies } = require('../controllers/showItineraryController.js');

router.get('/Itineraies', showallItineraies); 


module.exports = router;