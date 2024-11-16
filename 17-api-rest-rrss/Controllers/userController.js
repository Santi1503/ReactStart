const User = require("../Models/User")

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

    // Crear objeto de usuario
    let userToSave = new User(params)

    // Control usuario duplicados
    User.find({ $or: [
        {email: userToSave.email.toLowerCase()},
        {nickname: userToSave.nickname.toLowerCase()}
    ]}).then((users) => {
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El email o el nickname ya están en uso"
            })
        }
        
        // Cifrar la contraseña

        // Guardar usuario

        // Devolver respuesta
        return res.status (200).send({
            status: "success",
            message: "Registro exitoso",
            // params,
            userToSave
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

module.exports = {
    testUser,
    register
}