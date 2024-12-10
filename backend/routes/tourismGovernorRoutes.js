const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');
const historicalTagController = require('../controllers/historicalTagController');
const router = express.Router();

router.post('/create-place', tourismGovernorController.upload, tourismGovernorController.createPlace);
router.get('/get-places', tourismGovernorController.getPlaces);
router.put('/update-place/:historicalPlaceId',  tourismGovernorController.upload,tourismGovernorController.updatePlace);
router.delete('/delete-place/:historicalPlaceId', tourismGovernorController.deletePlace);
router.get('/get-my-places', tourismGovernorController.getMyPlaces);
router.post('/create-historical-tag',historicalTagController.createHistoricalTag);

module.exports = router;