const express = require("express");
const router = express.Router();
const {authenticate} = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");


router.post("/create-user", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/change-password",authenticate(["admin","seller","tourist","tourismGovernor","advertiser","tourGuide"]),userController.changePassword);
router.post('/upload-documents',authenticate(["seller","tourGuide","advertiser"]),userController.upload,userController.uploadRequiredDocuments);
router.put('/accept-reject-terms-and-conditions',authenticate(["seller","tourGuide","advertiser"]),userController.termsAndConditions);
module.exports = router;
