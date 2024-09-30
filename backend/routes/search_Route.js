const express = require('express');
const router = express.Router();
const { search } = require('./controllers/Search_Controller');
router.get('/search', search);

module.exports = router;