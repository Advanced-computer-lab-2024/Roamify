const express = require("express");
const {
  addTourismGovernor,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/add-governor", addTourismGovernor);

module.exports = router;
