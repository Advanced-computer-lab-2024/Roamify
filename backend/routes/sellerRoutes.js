const express = require('express');
const sellerController = require('../controllers/sellerController');

const router = express.Router();


router.post('/create-profile',sellerController.createProfile);
router.get('/get-profile',sellerController.getProfile);
router.put('/update-profile',sellerController.updateProfile);
module.exports = router;