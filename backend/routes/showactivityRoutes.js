const express = require('express');
const router = express.Router();
const { showallActivites } = require('../controllers/showActController.js');

router.get('/activities', showallActivites);


module.exports = router;
