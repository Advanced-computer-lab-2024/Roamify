const express = require("express");
const exchangeRateModel = require("../models/exchangeRateModel"); // Import the model
const exchangeRateController = require("../controllers/exchangeRateController");
const router = express.Router();

// Fetch all currencies and their rates
router.get("/fetch-all",exchangeRateController.fetchAllExchangeRates);

module.exports = router;
