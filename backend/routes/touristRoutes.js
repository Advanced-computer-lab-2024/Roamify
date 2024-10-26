const express = require("express");
const router = express.Router();
const touristController = require("../controllers/touristController");


router.post('/create-profile', touristController.createProfile);
router.get('/get-profile', touristController.getProfile);
router.put('/update-profile', touristController.updateProfile);
router.post('/add-wallet', touristController.addWallet);

module.exports = router;
