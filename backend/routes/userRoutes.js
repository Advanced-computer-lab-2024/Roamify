const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/createprofile',userController.createProfile);
router.get('/getprofile/:id', userController.getProfile);

module.exports = router;