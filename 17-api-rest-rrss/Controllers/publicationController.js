const fs = require("fs");
const path = require("path");
const Publication = require("../Models/Publication");
const followService = require("../services/followService");

// Acciones de prueba
const pruebaPublication = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/publication.js"
    });
}

// Guardar publicación
const save = async (req, res) => {
    const params = req.body;

    if (!params.text) {
        return res.status(400).send({ status: "error", message: "Debes enviar el texto de la publicación." });
    }

    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    try {
        const publicationStored = await newPublication.save();
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        });
    } catch (error) {
        return res.status(400).send({ status: "error", message: "No se ha guardado la publicación." });
    }
}

// Sacar una publicación
const detail = async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publicationStored = await Publication.findById(publicationId);
        if (!publicationStored) {
            return res.status(404).send({ status: "error", message: "No existe la publicación" });
        }

        return res.status(200).send({
            status: "success",
            message: "Mostrar publicación",
            publication: publicationStored
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error en la obtención de la publicación" });
    }
}

// Eliminar publicaciones
const remove = async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publicationRemoved = await Publication.findOneAndRemove({ user: req.user.id, _id: publicationId });
        if (!publicationRemoved) {
            return res.status(500).send({ status: "error", message: "No se ha eliminado la publicación" });
        }

        return res.status(200).send({
            status: "success",
            message: "Publicación eliminada",
            publication: publicationId
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al eliminar la publicación" });
    }
}

// Listar publicaciones de un usuario
const user = async (req, res) => {
    const userId = req.params.id;
    const page = req.params.page || 1;
    const itemsPerPage = 5;

    try {
        const publications = await Publication.find({ user: userId })
            .sort("-created_at")
            .populate('user', '-password -__v -role -email')
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!publications || publications.length <= 0) {
            return res.status(404).send({ status: "error", message: "No hay publicaciones para mostrar" });
        }

        const total = await Publication.countDocuments({ user: userId });
        return res.status(200).send({
            status: "success",
            message: "Publicaciones del perfil de un usuario",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            publications,
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al listar publicaciones" });
    }
}

// Subir ficheros
const upload = async (req, res) => {
    const publicationId = req.params.id;

    if (!req.file) {
        return res.status(404).send({ status: "error", message: "Petición no incluye la imagen" });
    }

    const image = req.file.originalname;
    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    if (["png", "jpg", "jpeg", "gif"].indexOf(extension) === -1) {
        const filePath = req.file.path;
        fs.unlinkSync(filePath);
        return res.status(400).send({ status: "error", message: "Extensión del fichero invalida" });
    }

    try {
        const publicationUpdated = await Publication.findOneAndUpdate(
            { user: req.user.id, _id: publicationId },
            { file: req.file.filename },
            { new: true }
        );

        if (!publicationUpdated) {
            return res.status(500).send({ status: "error", message: "Error en la subida del archivo" });
        }

        return res.status(200).send({
            status: "success",
            publication: publicationUpdated,
            file: req.file,
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error en la subida del avatar" });
    }
}

// Devolver archivos multimedia
const media = (req, res) => {
    const file = req.params.file;
    const filePath = "./uploads/publications/" + file;

    fs.stat(filePath, (error, exists) => {
        if (!exists) {
            return res.status(404).send({ status: "error", message: "No existe la imagen" });
        }

        return res.sendFile(path.resolve(filePath));
    });
}

// Listar el feed de publicaciones
const feed = async (req, res) => {
    const page = req.params.page || 1;
    const itemsPerPage = 5;

    try {
        const myFollows = await followService.followUserIds(req.user.id);
        const publications = await Publication.find({ user: myFollows.following })
            .populate("user", "-password -role -__v -email")
            .sort("-created_at")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        if (!publications) {
            return res.status(500).send({ status: "error", message: "No hay publicaciones para mostrar" });
        }

        const total = await Publication.countDocuments({ user: myFollows.following });
        return res.status(200).send({
            status: "success",
            message: "Feed de publicaciones",
            following: myFollows.following,
            total,
            page,
            pages: Math.ceil(total / itemsPerPage),
            publications
        });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error al obtener publicaciones del feed" });
    }
}

module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
    user,
    upload,
    media,
    feed
};