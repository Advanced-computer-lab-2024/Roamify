const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');

const router = express.Router();

router.get('/details', tourismGovernorController.getDetails);
router.put('/update', tourismGovernorController.updateDetails);
router.get('/:id', tourismGovernorController.getHistoricalPlace);
router.put('/update/:id', tourismGovernorController.updateHistoricalPlace);
router.post('/create', tourismGovernorController.createHistoricalPlace);
router.get('/activities', tourismGovernorController.getMyHistoricalPlaces);
router.delete('/:id', tourismGovernorController.deleteHistoricalPlace);

module.exports = router;