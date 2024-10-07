const express = require("express");
const userController = require("../controllers/userController");
const { UNSAFE_ErrorResponseImpl } = require("react-router-dom");

const router = express.Router();

router.post("/create-user", userController.createUser);
router.get("/get-profile/:id", userController.getUser);
router.get("/get-users/:role", userController.getUsersByRole);
router.post("/login", userController.loginUser);
router.delete('/delete-user/:id',userController.deleteUser);

module.exports = router;
