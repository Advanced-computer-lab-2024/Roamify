const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.get('/details', tourGuideController.getDetails);
router.put('/update', tourGuideController.updateDetails);
router.get('/:id', tourGuideController.getItineary);
router.put('/update/:id', tourGuideController.updateItineary);
router.post('/create', tourGuideController.createItineary);
router.get('/activities', tourGuideController.getMyItinearies);
router.delete('/:id', tourGuideController.deleteItineary);

module.exports = router;