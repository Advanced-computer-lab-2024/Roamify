const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create-user',userController.createUser);
router.get('/get-profile/:id', userController.getProfile);
module.exports = router;