const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');

const router = express.Router();

router.post('/create', tourismGovernorController.createHistoricalPlace);
router.get('/:id', tourismGovernorController.getHistoricalPlace);
router.put('/update/:id', tourismGovernorController.updateHistoricalPlace);
router.delete('/:id', tourismGovernorController.deleteHistoricalPlace);
router.get('/historicalPlaces', tourismGovernorController.getMyHistoricalPlaces);

module.exports = router;