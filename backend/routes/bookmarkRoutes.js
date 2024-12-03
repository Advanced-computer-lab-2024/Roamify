const express = require('express')
const router = express.Router()
const bookmarkController = require('../controllers/bookmarkController')

router.put('/activity', bookmarkController.bookmarkActivity)
router.put('/itinerary', bookmarkController.bookmarkItinerary)

router.get('/activity', bookmarkController.getBookmarkedActivities)
router.get('/itinerary', bookmarkController.getBookmarkedItineraries)

router.delete('/activity', bookmarkController.removeBookmarkedActivity)
router.delete('/itinerary', bookmarkController.removeBookmarkedItinerary)

module.exports = router