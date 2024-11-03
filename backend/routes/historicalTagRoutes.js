const express = require('express');
const historicalTagController = require('../controllers/historicalTagController');

const router = express.Router();

router.get("/get-all", historicalTagController.getAllHistoricalTags);

module.exports = router;