const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.post('/create-profile/:id',tourGuideController.createProfile)
router.get('/get-profile/:id', tourGuideController.getProfile);
 router.put('/update-profile/:id', tourGuideController.updateProfile);
router.post('/create-itineary/:id', tourGuideController.createItineary);
router.get('/get-itinearies', tourGuideController.getItinearies);
router.put('/update-itineary/:tourGuideId/:itinearyId', tourGuideController.updateItineary);
 router.delete('/delete-itineary/:tourGuideId/:itinearyId', tourGuideController.deleteItineary);
router.get('/get-my-itinearies/:id', tourGuideController.getMyItinearies);

module.exports = router;