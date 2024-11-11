const { conexion } = require("./database/conexion")
const express = require("express")
const cors = require("cors")

// Conectar Base de Datos
conexion()

// Node Server
const app = express()
const puerto = 3900

// Configuración de cors
app.use(cors())

// Convertir body a js
app.use(express.json()) // Resibe dato en json
app.use(express.urlencoded({ extended: true })) // Recibe datos en formato urlencoded

// Rutas
const articleRoutes = require("./routes/articleRoute")

// Cargar Rutas
app.use("/api", articleRoutes)

// Rutas pruebas
app.get("/probando", (req, res) => {
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
})

app.get("/", (req, res) => {
    return res.status(200).send(`
        <h1>API RESTful</h1>
        <p>Esta es una API RESTful con Node Js y Express</p>
        <a href="/probando">Probando la API</a>
    `)
})

// Escuchar el puerto
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto)
})
