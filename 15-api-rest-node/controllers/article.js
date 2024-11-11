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

const crear = (req, res) => {
    // Recoger parametros por post a guardar
    

    return res.status(200).json({
        message: "Guardado correctamente"
    })
}

module.exports = {
    test,
    cursos,
    crear
}