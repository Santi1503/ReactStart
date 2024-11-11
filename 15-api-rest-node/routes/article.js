const express = require("express")
const router = express.Router()
const ArticleController = require("../controllers/article")

// Rutas de pruebas
router.get("/ruta-test", ArticleController.test)
router.get("/cursos", ArticleController.cursos)

// Ruta util
router.post("/crear", ArticleController.crear)

module.exports = router

