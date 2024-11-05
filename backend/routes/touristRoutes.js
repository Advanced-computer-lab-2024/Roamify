const express = require("express");
const router = express.Router();
const touristController = require("../controllers/touristController");


router.post('/create-profile', touristController.createProfile);
router.get('/get-profile', touristController.getProfile);
router.put('/update-profile', touristController.updateProfile);
router.post('/add-wallet', touristController.addWallet);

router.get('/products/')
router.post('/book-itinerary', touristController.bookItinerary);
router.post('/book-activity', touristController.bookActivity);
router.put('/select-preferences', touristController.selectPreferenceTag);
router.put('/book-transportation', touristController.bookTransportation);
router.delete('/cancel-itinerary-booking', touristController.cancelItinerary);
router.delete('/cancel-activity-booking', touristController.cancelActivity);




module.exports = router;
