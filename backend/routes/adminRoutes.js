const express = require("express");
const {
  addTourismGovernor,
  addAdmin,
  deleteUser,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/add-tourism-governor", addTourismGovernor);
router.delete("/delete-account/:id", deleteUser);
router.post("/add-admin", addAdmin);
module.exports = router;
