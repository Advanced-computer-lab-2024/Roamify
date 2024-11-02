const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.post('/create-profile',tourGuideController.createProfile)
router.get('/get-profile', tourGuideController.getProfile);
router.put('/update-profile', tourGuideController.updateProfile);
router.post('/create-itinerary', tourGuideController.createItinerary);
router.put('/update-itinerary/:itineraryId', tourGuideController.updateItinerary);
router.delete('/delete-itinerary/:itineraryId', tourGuideController.deleteItinerary);
router.get('/get-my-itineraries', tourGuideController.getMyItineraries);
module.exports = router;