const express = require('express');
const router = express.Router();
const  publicationController = require("../Controllers/publicationController")

// GET publication
router.get("/test-publication", publicationController.testPublication)

module.exports = router