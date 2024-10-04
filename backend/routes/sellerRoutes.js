const express = require('express');
const sellerController = require('../controllers/sellerController');

const router = express.Router();


router.post('/createprofile/:id',sellerController.createProfile);
router.get('/getprofile/:id',sellerController.getProfile);

module.exports = router;