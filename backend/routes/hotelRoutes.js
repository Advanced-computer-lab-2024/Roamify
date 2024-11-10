// routes/hotelRoutes.js
const express = require('express');
const { searchHotels, bookHotel } = require('../controllers/hotelController');
const router = express.Router();

router.post('/search', searchHotels);

module.exports = router;
