const express = require('express');
const router = express.Router();
const  userController = require("../Controllers/userController")
const auth = require("../Middlewares/auth")
// GET users
router.get("/test-user", auth, userController.testUser)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/profile/:id", auth, userController.profile)
router.get("/list/:page?", auth, userController.list)
router.put("/update", auth, userController.update)


module.exports = router