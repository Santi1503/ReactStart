const validator = require("validator")
const Article = require("../models/Article")

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

module.exports = {
    test,
    cursos,
    crear,
    list,
    one
}