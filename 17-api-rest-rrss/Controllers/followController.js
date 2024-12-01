const Follow = require("../Models/Follow")
const User = require("../Models/User")
const { param } = require("../Routes/followRoute")
const mongoosePaginate = require("mongoose-pagination")
const followService = require("../Services/followService")

const testFollow = (req, res) => {
    return res.status(200).send({
        message: "Esta es una prueba"
    })
}

const save = async (req, res) => {
    try {
        const params = req.body
        const identity = req.user

        let userToFollow = new Follow({
            user: identity.id,
            followed: params.followed
        })

        const followStored = await userToFollow.save()

        return res.status(200).send({
            status: "success",
            loggedIn: req.user,
            follow: followStored
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al guardar la relación de seguidor",
            error: error.message
        })
    }
}

const unfollow = async (req, res) => {
    try {
        const userId = req.user.id
        const followedId = req.params.id

        // Usamos el método deleteOne() o findOneAndDelete() para eliminar el follow
        const followDeleted = await Follow.findOneAndDelete({
            user: userId,
            followed: followedId
        })

        if (!followDeleted) {
            return res.status(404).send({
                status: "error",
                message: "Relación de seguidor no encontrada"
            })
        }

        return res.status(200).send({
            status: "success",
            message: "Follow eliminado correctamente",
            loggedIn: req.user,
            unfollow: followDeleted
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al eliminar la relación de seguidor",
            error: error.message
        })
    }
}

const following = async (req, res) => {
    let userId = req.user.id

    if (req.params.id){
        userId = req.params.id
    }

    let page = 1

    if (req.params.page){
        page = req.params.page
        page = parseInt(page)
    }

    const itemsPerPage = 5

    try {
        const follows = await Follow.find({user: userId})
            .populate("user followed", "-password -role -__v")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage)

        // Obtener el total de seguidores
        const total = await Follow.countDocuments({user: userId})

        const followUserIds = await followService.followUserIds(req.user.id)

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que sigo",
            follows,
            total,
            pages: Math.ceil(total / itemsPerPage), // Calculando el total de páginas
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al obtener los seguidores",
            error: error.message
        })
    }
}

const followers = async (req, res) => {
    let userId = req.user.id

    if (req.params.id){
        userId = req.params.id
    }

    let page = 1

    if (req.params.page){
        page = req.params.page
        page = parseInt(page)
    }

    const itemsPerPage = 5

    try {
        const follows = await Follow.find({followed: userId})
            .populate("user followed", "-password -role -__v")
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage)

        // Obtener el total de seguidores
        const total = await Follow.countDocuments({followed: userId})

        const followUserIds = await followService.followUserIds(req.user.id)

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que me siguen",
            follows,
            total,
            pages: Math.ceil(total / itemsPerPage), // Calculando el total de páginas
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al obtener los seguidores",
            error: error.message
        })
    }
}

module.exports = {
    testFollow,
    save,
    unfollow,
    following,
    followers,
}