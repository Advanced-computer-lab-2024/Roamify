const placesController = require("../controllers/placesController");
const express = require("express");
const router = express.Router();


router.get('/', placesController.getFilteredPlaces);

module.exports = router;