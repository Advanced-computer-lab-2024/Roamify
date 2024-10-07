const express = require('express');

const userController = require("../controllers/userController");



router.post("/create-user", userController.createUser);
router.get("/get-profile/:id", userController.getUser);
router.get("/get-users/:role", userController.getUsersByRole);
router.post("/login", userController.loginUser);
router.delete('/delete-user/:id',userController.deleteUser);

module.exports = router;
