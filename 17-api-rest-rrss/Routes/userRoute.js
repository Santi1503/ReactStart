const express = require('express');
const router = express.Router();
const  userController = require("../Controllers/userController")

// GET users
router.get("/test-user", userController.testUser)
router.post("/register", userController.register)

module.exports = router