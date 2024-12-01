const express = require("express");
const router = express.Router();
const publicationController = require("../Controllers/publicationController");
const auth = require("../Middlewares/auth")

// Rutas de prueba
router.get("/test-publication", publicationController.pruebaPublication);

// Rutas para la gestión de publicaciones
router.post("/save", auth, publicationController.save);
router.get("/detail/:id", auth, publicationController.detail);
router.delete("/remove/:id", auth, publicationController.remove);
router.get("/user/:id/:page?", auth, publicationController.user);  // El ? hace que la página sea opcional
router.post("/upload/:id", auth, publicationController.upload);
router.get("/media/:file", auth, publicationController.media);
router.get("/feed/:page?", auth, publicationController.feed);

module.exports = router;