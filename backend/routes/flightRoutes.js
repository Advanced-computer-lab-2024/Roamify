// routes/flightRoutes.js
const express = require('express');
const { searchFlights } = require('../controllers/flightController');
const router = express.Router();

// Route for searching flights
router.get('/search', searchFlights);

// Route for booking a flight
// router.post('/book-flight', bookFlight);

module.exports = router;
