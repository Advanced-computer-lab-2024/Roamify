const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.post('/create-profile/:id',tourGuideController.createProfile)
router.get('/get-profile/:id', tourGuideController.getProfile);
 router.put('/update-profile/:id', tourGuideController.updateProfile);
// router.post('/create/itineary', tourGuideController.createItineary);
// router.get('/:id', tourGuideController.getItineary);
// router.put('/update/:id', tourGuideController.updateItineary);
// router.delete('/:id', tourGuideController.deleteItineary);
// router.get('/myItinearies', tourGuideController.getMyItinearies);

module.exports = router;