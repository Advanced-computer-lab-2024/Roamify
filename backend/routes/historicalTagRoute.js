const express = require('express');
const router = express.Router();
const { createHistoricalTag } = require('../controllers/historicalTagController'); 

router.post('/createhistoricalTag', createHistoricalTag);

module.exports = router;