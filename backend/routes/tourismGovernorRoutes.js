const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');

const router = express.Router();

router.post('/create-place/:id', tourismGovernorController.createPlace);
router.get('/get-places', tourismGovernorController.getPlaces);
router.put('/update-place/:tourismGovernorId/:historicalPlaceId', tourismGovernorController.updatePlace);
router.delete('/delete-place/:tourismGovernorId/:historicalPlaceId', tourismGovernorController.deletePlace);
router.get('/get-my-places/:id', tourismGovernorController.getMyPlaces);

module.exports = router;