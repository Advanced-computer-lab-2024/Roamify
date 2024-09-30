const express = require('express');
const router = express.Router();
const { viewUpcoming } = require('../controllers/View_Controller');
router.get('/viewUpcoming', viewUpcoming);
module.exports = router;