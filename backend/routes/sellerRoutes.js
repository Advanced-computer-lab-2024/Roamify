const express = require('express');
const sellerController = require('../controllers/sellerController');

const router = express.Router();


router.post('/create-profile/:id',sellerController.createProfile);
router.get('/get-profile/:id',sellerController.getProfile);
router.put('/update-profile/:id',sellerController.updateProfile);
module.exports = router;