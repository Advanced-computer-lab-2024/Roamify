const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.get('/create/profile',tourGuideController.createProfile)
router.get('/details', tourGuideController.getProfile);
router.put('/update', tourGuideController.updateProfile);
router.post('/create/itineary', tourGuideController.createItineary);
router.get('/:id', tourGuideController.getItineary);
router.put('/update/:id', tourGuideController.updateItineary);
router.delete('/:id', tourGuideController.deleteItineary);
router.get('/myItinearies', tourGuideController.getMyItinearies);

module.exports = router;