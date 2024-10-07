const express = require('express');
const router = express.Router();
const { filterUpcomingActivites } = require('../controllers/filterActController.js');

router.get('/activities/filter', filterUpcomingActivites); 

module.exports = router;
