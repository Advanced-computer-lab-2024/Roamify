const express = require('express');
const tourGuideController = require('../controllers/tourGuideController');

const router = express.Router();

router.post('/createprofile/:id',tourGuideController.createProfile)
router.get('/getprofile/:id', tourGuideController.getProfile);
router.put('/updateprofile/:id', tourGuideController.updateProfile);
router.post('/createitineary/:id', tourGuideController.createItineary);
// router.get('/getitineary/:id', tourGuideController.getItineary);
// router.put('/update/:id', tourGuideController.updateItineary);
router.delete('/deleteitineary/:id', tourGuideController.deleteItineary);
router.get('/myitinearies/:id', tourGuideController.getMyItinearies);

module.exports = router;