const express = require('express');
const router = express.Router();
const  followController = require("../Controllers/followController")

// GET users
router.get("/test-follow", followController.testFollow)

module.exports = router