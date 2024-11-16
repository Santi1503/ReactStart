const { connection } = require("./Database/connection")
const express = require("express")
const cors = require("cors")
const userRoutes = require("./Routes/userRoute")
const publicationRoutes = require("./Routes/publicationRoute")
const followRoutes = require("./Routes/followRoute")

console.log("Api node para rrss iniciada")
connection()

const app = express()
const port = 3900

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Rutas generales
app.use("/api/user", userRoutes)
app.use("/api/publication", publicationRoutes)
app.use("/api/follow", followRoutes)

app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json({message: "Hola mundo"})
})

app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`)
})