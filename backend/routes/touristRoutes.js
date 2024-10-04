const express = require('express');
const touristController = require('../controllers/touristController');

const router = express.Router();

router.post('/createprofile/:id',touristController.createProfile);
router.get('/getprofile/:id',touristController.getProfile);
router.put('/updateprofile/:id',touristController.updateProfile);
module.exports = router;