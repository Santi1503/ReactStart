const express = require("express")
const router = express.Router()
const ArticleController = require("../controllers/articleControllers")

// Rutas de pruebas
router.get("/ruta-test", ArticleController.test)
router.get("/cursos", ArticleController.cursos)

// Ruta util
router.post("/crear", ArticleController.crear)
router.get("/articulos/:ultimos?", ArticleController.list)
router.get("/articulo/:id", ArticleController.one)


module.exports = router

