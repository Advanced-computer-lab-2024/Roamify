const complaintController = require("../controllers/complaintController");
const express = require("express");
const {authenticate} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create",authenticate(["tourist"]), complaintController.fileComplaint);
router.get('/',authenticate(["admin"]),complaintController.viewComplaints);
router.get('/get-body/:complaintId',authenticate(["admin"]),complaintController.viewComplaintDesc);
module.exports = router;