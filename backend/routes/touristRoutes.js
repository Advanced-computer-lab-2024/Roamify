const express = require('express');
const touristController = require('../controllers/touristController');

const router = express.Router();

router.post('/createprofile/:id',touristController.createProfile);
module.exports = router;