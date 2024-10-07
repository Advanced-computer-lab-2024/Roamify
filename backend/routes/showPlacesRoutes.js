const express = require('express');
const router = express.Router();
const { showallPlaces } = require('../controllers/showplacesController.js');

router.get('/places', showallPlaces); 

    
module.exports = router;