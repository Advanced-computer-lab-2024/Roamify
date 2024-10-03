const express = require('express');
const businessUserController = require('../controllers/businessUserController');

const router = express.Router();

router.post('/createprofile',businessUserController.createBusinessUser);
router.get('/getprofile/:id', businessUserController.getProfile);
module.exports = router;