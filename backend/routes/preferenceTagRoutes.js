const express = require('express');
const preferenceTagController = require('../controllers/preferenceTagController');

const router = express.Router();

router.get("/get-all", preferenceTagController.getAllPreferenceTags);

module.exports = router;