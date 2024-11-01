const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');
const historicalTagController = require('../controllers/historicalTagController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/create-place', upload.array('image',3), tourismGovernorController.createPlace);
router.get('/get-places', tourismGovernorController.getPlaces);
router.put('/update-place/:historicalPlaceId', tourismGovernorController.updatePlace);
router.delete('/delete-place/:historicalPlaceId', tourismGovernorController.deletePlace);
router.get('/get-my-places', tourismGovernorController.getMyPlaces);
router.post('/create-historical-tag',historicalTagController.createHistoricalTag);

module.exports = router;