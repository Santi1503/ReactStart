const express = require('express');
const router = express.Router();
const  followController = require("../Controllers/followController")
const auth = require("../Middlewares/auth")


// GET users
router.get("/test-follow", followController.testFollow)
router.post("/save", auth, followController.save)
router.delete("/unfollow/:id", auth, followController.unfollow)
router.get("/following/:id?/:page?", auth, followController.following)
router.get("/followers/:id?/:page?", auth, followController.followers)

module.exports = router