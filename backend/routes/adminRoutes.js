const express = require("express");
const {
  addTourismGovernor,
  addAdmin,
  deleteUser,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/add-governor", addTourismGovernor);
router.post("/delete-account/:id", deleteUser);
router.post("/create-admin", addAdmin);
module.exports = router;
