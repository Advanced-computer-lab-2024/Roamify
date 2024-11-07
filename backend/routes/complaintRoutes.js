const complaintController = require("../controllers/complaintController");
const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authenticate(["tourist"]), complaintController.fileComplaint);
router.get("/", authenticate(["admin"]), complaintController.viewComplaints);
router.get("/details/:complaintId", authenticate(["admin"]), complaintController.viewComplaintDesc);
router.get("/my-complaints", authenticate(["tourist"]), complaintController.viewMyComplaints);
router.patch("/resolve/:complaintId", authenticate(["admin"]), complaintController.markComplaintAsResolved);
router.patch("/reply/:complaintId", authenticate(["admin"]), complaintController.addOrUpdateReply);

module.exports = router;
