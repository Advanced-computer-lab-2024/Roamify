const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/send-otp", resetPasswordController.sendOtp);
router.post("/check-otp", resetPasswordController.checkOtp);
router.post("/", resetPasswordController.changePassword);

module.exports = router;
