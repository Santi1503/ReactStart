const testFollow = (req, res) => {
    return res.status (200).send({
        message: "Esta es una prueba"
    })
}

module.exports = {
    testFollow,
}