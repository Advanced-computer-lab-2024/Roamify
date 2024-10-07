const express = require('express');
const router = express.Router();
const { filterPlacesByTag } = require('../controllers/filterPlaceController.js');
router.get('/places/filter', filterPlacesByTag);

module.exports = router;
