const express = require('express');
const router = express.Router();
const { getSortedUpcomingActivitesItinerary } = require('../controllers/sortController.js');
router.get('/upcoming/sorted', getSortedUpcomingActivitesItinerary);

module.exports = router;