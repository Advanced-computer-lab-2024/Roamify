const express = require("express");
const router = express.Router();
const touristController = require("../controllers/touristController");


router.post('/create-profile', touristController.createProfile);
router.get('/get-profile', touristController.getProfile);
router.put('/update-profile', touristController.updateProfile);

router.get('/products/')
router.post('/book-itinerary', touristController.bookItinerary);
router.post('/book-activity', touristController.bookActivity);
router.put('/select-preferences', touristController.selectPreferenceTag);
router.put('/book-transportation', touristController.bookTransportation);
router.delete('/cancel-itinerary-booking', touristController.cancelItinerary);
router.delete('/cancel-activity-booking', touristController.cancelActivity);
router.delete('/cancel-transportation-booking', touristController.cancelTransportationBooking);
router.get('/get-booked-transportations', touristController.getBookedTransportations);
router.get('/get-all-booked-activities', touristController.getAllBookedActivities);
router.get('/get-all-booked-itineraries', touristController.getAllBookedItineraries);
router.get('/get-all-upcoming-booked-itineraries', touristController.getAllUpcomingBookedItineraries);
router.get('/get-all-upcoming-booked-activities', touristController.getAllUpcomingBookedActivities);
router.get('/get-all-transportation', touristController.getFilteredTransportations);
router.get('/view-points-level', touristController.viewPointsLevel);
router.put('/redeem-points', touristController.redeemPoints);
router.get('/get-upcoming-booked-transportations', touristController.getBookedFutureTransportations);



module.exports = router;
