const express = require("express");
const router = express.Router();
const {
  createHistoricalTag,
} = require("../controllers/historicalTagController");

router.post("/create-historical-tag", createHistoricalTag);

module.exports = router;
