const express = require('express');
const touristController = require('../controllers/touristController');

const router = express.Router();

router.post('/create-profile/:id',touristController.createProfile);
router.get('/get-profile/:id',touristController.getProfile);
router.put('/update-profile/:id',touristController.updateProfile);
module.exports = router;