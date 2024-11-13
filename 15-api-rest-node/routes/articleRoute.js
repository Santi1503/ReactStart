const express = require("express")
const router = express.Router()
const multer = require("multer")
const ArticleController = require("../controllers/articleControllers")
const path = require("path")

const articlesStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/articles/')
    },
    filename: function(req, file, cb) {
        cb(null, "article_" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"]
    const fileExtension = path.extname(file.originalname).toLowerCase().slice(1)

    if (!allowedExtensions.includes(fileExtension)) {
        return cb(new Error("Only images are allowed"), false)
    }

    cb(null, true)
}
const uploads = multer({ storage: articlesStorage, fileFilter: fileFilter })

// Rutas de pruebas
router.get("/ruta-test", ArticleController.test)
router.get("/cursos", ArticleController.cursos)

// Ruta util
router.post("/crear", ArticleController.crear)
router.get("/articulos/:ultimos?", ArticleController.list)
router.get("/articulo/:id", ArticleController.one)
router.delete("/articulo/:id", ArticleController.deleteArticle)
router.put("/articulo/:id", ArticleController.edit)
router.post("/subir-imagen/:id", [uploads.single("file0")], ArticleController.upload)
router.get("/imagen/:fichero", ArticleController.image)
router.get("/search/:search", ArticleController.searchArticle)

module.exports = router