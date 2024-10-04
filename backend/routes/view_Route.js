const express = require('express');
const router = express.Router();
const { viewUpcoming } = require('../controllers/viewController.js');
router.get('/viewUpcoming', viewUpcoming);
module.exports = router;