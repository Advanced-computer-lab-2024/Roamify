const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.post('/create-profile', tourGuideController.createProfile)
router.get('/get-profile', tourGuideController.getProfile);
router.put('/update-profile', tourGuideController.updateProfile);
router.post('/create-itinerary', tourGuideController.createItinerary);
router.put('/update-itinerary/:itineraryId', tourGuideController.updateItinerary);
router.delete('/delete-itinerary/:itineraryId', tourGuideController.deleteItinerary);
router.get('/get-my-itineraries', tourGuideController.getMyItineraries);
router.post('/upload-profile-picture', tourGuideController.upload, tourGuideController.uploadProfilePicture);
router.put('/set-status-itinerary', tourGuideController.setStatusOfItinerary);
router.get('/view-revenue', tourGuideController.viewRevenue);
module.exports = router;