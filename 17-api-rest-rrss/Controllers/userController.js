const User = require("../Models/User")
const bcrypt = require("bcrypt")

const testUser = (req, res) => {
    return res.status (200).send({
        message: "Esta es una prueba"
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
        const token = "Aquí-generarás-tu-token"; 

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

module.exports = {
    testUser,
    register,
    login
}