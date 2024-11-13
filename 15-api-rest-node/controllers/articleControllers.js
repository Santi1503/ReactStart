const validator = require("validator")
const Article = require("../models/Article")
const fs = require("fs")
const { error } = require("console")
const path = require("path")

const test = (req, res) => {
    return res.status(200).json({
        message: "test"
    })
}

const cursos = (req, res) => {
    return res.status(200).json([
        {
        curso: "Node Js",
        mensaje: "Probando API con Node Js y Express",
        fecha: new Date()
        },
        {
            curso: "React",
            mensaje: "Programando en React",
            fecha: new Date()
        },
    ])
}

const crear = async (req, res) => {
    // Recoger parametros por post a guardar
    try {
        let parametros = req.body

        let validateTitle = !validator.isEmpty(parametros.title) && validator.isLength(parametros.title, {min: 5,max: undefined})
        let validateContent = !validator.isEmpty(parametros.content)

        if (!validateTitle || !validateContent) {
            throw new Error("No se ha validado la información")
        }

        const article = new Article(parametros)
        const articleSaved = await article.save()

        return res.status(200).json({
            status: "success",
            article: articleSaved,
            message: "Articulo creado correctamente"
        })

    } catch(error) {
        return res.status(400).json({
            status: "error",
            message: "Error al guardar",
            error
        })
    }
}

const list = (req, res) => {
    let consulta = Article.find({})
    
    if (isNaN(req.params.ultimos) == false) {
        consulta.limit(req.params.ultimos)
    }
    
    consulta.sort({createdAt: -1})
    
    consulta.then((articles) => {
        return res.status(200).send({
            status: "success",
            parametro: req.params.ultimos,
            count: articles.length,
            articles,
            message: "Artículos obtenidos correctamente"
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            message: "Error al obtener los artículos",
            error
        })
    })
}

const one = (req, res) => {
    let id = req.params.id;
    Article.findById(id)
       .then((article) => {
            if (!article) {
                return res.status(404).json({
                    status: "error",
                    message: "Artículo no encontrado"
                });
            }
            return res.status(200).json({
                status: "success",
                article,
                message: "Artículo obtenido correctamente"
            });
        })
       .catch((error) => {
            return res.status(400).json({
                status: "error",
                message: "Error al obtener el artículo",
                error
            });
        });
}

const deleteArticle = (req, res) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id)
       .then((article) => {
            if (!article) {
                return res.status(404).json({
                    status: "error",
                    message: "Artículo no encontrado"
                });
            }
            return res.status(200).json({
                status: "success",
                article,
                message: "Artículo eliminado correctamente"
            });
        })
       .catch((error) => {
            return res.status(400).json({
                status: "error",
                message: "Error al eliminar el artículo",
                error
            });
        });
}

const validateArticle = async (parametros, req, res, id) => {
    try {
        let validateTitle = !validator.isEmpty(parametros.title) && validator.isLength(parametros.title, {min: 5, max: undefined})
        let validateContent = !validator.isEmpty(parametros.content)

        if (!validateTitle || !validateContent) {
            throw new Error("No se ha validado la información")
        }

        const article = await Article.findByIdAndUpdate(id, parametros, {new: true})

        return res.status(200).json({
            status: 'success',
            article,
            message: "Artículo editado correctamente"
        })
    } catch(error) {
        return res.status(500).json({
            status: "error",
            message: "Error al editar el artículo",
            error
        })
    }
}

const edit = (req, res) => {
    let id = req.params.id;
    let parametros = req.body;

    validateArticle(parametros, req, res, id)
    
}

const upload = async (req, res) => {
    const extension = req.file.filename.split('.').pop().toLowerCase();

    if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error al eliminar el archivo:", err);
        });
        return res.status(400).json({
            status: "error",
            message: "La extensión del archivo no es válida"
        });
    } else {
        try {
            let id = req.params.id;

            // Actualizamos el artículo con la nueva imagen
            const updatedArticle = await Article.findOneAndUpdate(
                { _id: id },
                { image: req.file.filename },
                { new: true }
            );

            if (!updatedArticle) {
                return res.status(400).json({
                    status: "error",
                    message: "Error al actualizar el artículo"
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Imagen subida correctamente",
                file: req.file
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Error al actualizar el artículo",
                error
            });
        }
    }
};

const image = (req, res) => {
    let fichero = req.params.fichero
    let pathFichero = path.resolve(
        __dirname,
        "..",
        "images",
        "articles",
        fichero
    )

    fs.access(pathFichero, fs.constants.F_OK, (error) => {
        if (!error) {
            return res.sendFile(pathFichero)
        } else {
            return res.status(404).json({
                status: "error",
                message: "Imagen no encontrada",
                error,
                fichero,
                pathFichero
            })
        }
    })
}

const searchArticle = (req, res) => {
    let search = req.params.search;

    // Validar que el parámetro de búsqueda sea una cadena
    if (!search || typeof search !== "string" || search.trim() === "") {
        return res.status(400).json({
            status: "error",
            message: "El parámetro de búsqueda es inválido o está vacío"
        });
    }

    Article.find({
        "$or": [
            { "title": { "$regex": search, "$options": "i" } },
            { "content": { "$regex": search, "$options": "i" } }
        ]
    })
    .sort({ createdAt: -1 })
    .then(articlesFound => {
        // Verificar si no se encontraron artículos
        if (!articlesFound || articlesFound.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No se encontraron artículos que coincidan con la búsqueda"
            });
        }

        // Devolver los artículos encontrados
        return res.status(200).json({
            status: "success",
            articles: articlesFound,
            message: "Artículos encontrados correctamente"
        });
    })
    .catch(error => {
        // Manejo de errores
        console.error("Error al buscar artículos:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al buscar los artículos",
            error
        });
    });
};

module.exports = {
    test,
    cursos,
    crear,
    list,
    one,
    deleteArticle,
    edit,
    upload,
    image,
    searchArticle
}