const express = require('express');
const tourismGovernorController = require('../controllers/tourismGovernorController');

const router = express.Router();

router.post('/createhistoricalplace/:id', tourismGovernorController.createHistoricalPlace);
router.get('/gethistoricalplace/:id', tourismGovernorController.getHistoricalPlace);
router.put('/updatehistoricalplace/:id', tourismGovernorController.updateHistoricalPlace);
router.delete('/deletehistoricalplace/:id', tourismGovernorController.deleteHistoricalPlace);
router.get('/myhistoricalplaces/:id', tourismGovernorController.getMyHistoricalPlaces);

module.exports = router;