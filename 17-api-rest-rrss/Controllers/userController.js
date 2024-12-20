const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("../Services/jwt")
const mongoosePagination = require("mongoose-pagination")
const fs = require("fs")
const path = require("path")
const followService = require("../Services/followService")

const testUser = (req, res) => {
    return res.status (200).send({
        message: "Esta es una prueba",
        user: req.user
    })
}

// registro
const register = async (req, res) => {
    // Recoger datos de peticion
    let params = req.body

    // Comprobar recepción
    if (!params.name || !params.email || !params.password || !params.nickname) {
       return res.status(400).send({
        status: "error",
        message: "Faltan datos por rellenar"
       })
    }

    // Control usuario duplicados
    User.find({ $or: [
        {email: params.email.toLowerCase()},
        {nickname: params.nickname.toLowerCase()}
    ]}).then(async(users) => {
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El email o el nickname ya están en uso"
            })
        }
        
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(params.password, 10)
        params.password = hashedPassword

        // Crear objeto de usuario
        const userToSave = new User(params)
        
        // Guardar usuario
        const savedUser = await userToSave.save()

        // Devolver respuesta
        return res.status (200).send({
            status: "success",
            message: "Registro exitoso",
            // params,
            user: savedUser
        })
    }).catch((error) => {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "Error en la consulta de usuarios"
            })
        }
    })
}

const login = async (req, res) => {
    try {
        // Recoger params del body
        const { email, password } = req.body;

        // Validar que se enviaron los datos necesarios
        if (!email || !password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        // Buscar si existe el usuario
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "El usuario no existe"
            });
        }

        // Comprobar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        // Generar token
        const token = jwt.createToken(user)

        // Devolver datos del usuario junto con el token
        return res.status(200).send({
            status: "success",
            message: "Login exitoso",
            user: {
                id: user._id,
                email: user.email,
                nickname: user.nickname,
                name: user.name,
            },
            token
        });

    } catch (error) {
        // Manejo de errores inesperados
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

const profile = async (req, res) => {
    const id = req.params.id;

    try {
        // Buscar el usuario por su ID
        const user = await User.findById(id).select({password: 0, role: 0});
        
        // Si el usuario no se encuentra, devolver un error
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        const followInfo = await followService.followThisUser(req.user.id, id)

        // Devolver el perfil del usuario encontrado
        return res.status(200).send({
            status: "success",
            user: user,
            following: followInfo.following,
            follower: followInfo.follower
        });
    } catch (error) {
        // Manejo de errores si ocurre algún problema al buscar el usuario
        return res.status(500).send({
            status: "error",
            message: "Error en la consulta del usuario",
            error: error.message
        });
    }
}

const list = async (req, res) => {
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    page = parseInt(page);

    const itemsPerPage = 5;

    try {
        const users = await User.find().sort('_id').skip((page - 1) * itemsPerPage).limit(itemsPerPage);
        const total = await User.countDocuments(); // Total de usuarios

        const followInfo = await followService.followThisUser(req.user.id, id)

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios",
            currentPage: page,
            users,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage), // Calculando el total de páginas
            userFolowing: followInfo.following,
            userFollower: followInfo.follower
        });
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "Error en la consulta de usuarios",
            error: error.message
        });
    }
};

const update = async (req, res) => {
    let userIdentity = req.user;
    let userToUpdate = req.body;

    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    try {
        // Comprobar si el email o el nickname ya están en uso
        const users = await User.find({
            $or: [
                { email: userToUpdate.email.toLowerCase() },
                { nickname: userToUpdate.nickname.toLowerCase() }
            ]
        });

        let userIsset = false;
        users.forEach(user => {
            if (user && user._id != userIdentity.id) {
                userIsset = true;
                return;
            }
        });

        if (userIsset) {
            return res.status(200).send({
                status: "success",
                message: "El email o el nickname ya están en uso"
            });
        }

        // Cifrar la contraseña si está presente
        if (userToUpdate.password) {
            const hashedPassword = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = hashedPassword;
        } else {
            userToUpdate.password = userIdentity.password
        }

        // Actualizar el usuario
        const userUpdated = await User.findByIdAndUpdate(userIdentity.id, userToUpdate, { new: true });

        if (!userUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar el usuario"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Usuario actualizado correctamente",
            userUpdated
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en la actualización del usuario",
            error: error.message
        });
    }
};

const upload = async (req, res) => {
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "No se ha subido ninguna imagen"
        });
    }

    let image = req.file.originalname;
    const imageSplit = image.split(".");
    const extension = imageSplit[1];

    if (extension !== "png" && extension !== "jpg" && extension !== "jpeg" && extension !== "gif") {
        const filePath = req.file.path;
        fs.unlinkSync(filePath); // Eliminar el archivo si el formato no es válido
        return res.status(400).send({
            status: "error",
            message: "Formato de imagen no válido"
        });
    }

    try {
        const userUpdated = await User.findOneAndUpdate(
            { _id: req.user.id },
            { image: req.file.filename },
            { new: true }
        );

        if (!userUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error al intentar subir el avatar"
            });
        }

        return res.status(200).send({
            status: "success",
            user: userUpdated,
            file: req.file
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al intentar subir el avatar",
            error: error.message
        });
    }
};

const avatar = (req, res) => {
    const file = req.params.file

    const filePath = "./uploads/avatars/"+file

    fs.stat(filePath, (error, exists) => {
        if(!exists){
            return res.status(404).send({
                status: "error",
                message: "Archivo no encontrado"
            })
        }

        return res.sendFile(path.resolve(filePath))
    })
}

const counters = async (req, res) => {

    let userId = req.user.id;

    if (req.params.id) {
        userId = req.params.id;
    }

    try {
        const following = await Follow.count({ "user": userId });

        const followed = await Follow.count({ "followed": userId });

        const publications = await Publication.count({ "user": userId });

        return res.status(200).send({
            userId,
            following: following,
            followed: followed,
            publications: publications
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en los contadores",
            error
        });
    }
}

module.exports = {
    testUser,
    register,
    login,
    profile,
    list,
    update,
    upload,
    avatar,
    counters
}