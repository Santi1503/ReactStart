const jwt = require("jwt-simple")
const moment = require("moment")

const secret = "CLAVE_SECRETA_DEL_CURSO_RRSS_150303"

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload, secret)
}

module.exports = {
    secret,
    createToken
}