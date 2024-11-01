const itineraryController = require("../controllers/itineraryController");
const express = require("express");
const router = express.Router();


router.get('/', itineraryController.getFilteredItineraries);

module.exports = router;