const express = require('express');
const sellerController = require('../controllers/sellerController');

const router = express.Router();


router.post('/createprofile/:id',sellerController.createProfile);

module.exports = router;