const bcrypt = require("bcryptjs/dist/bcrypt")
const { response } = require("express")
const { generarJWT } = require("../helpers/jwt")
const user = require("../models/user")

const revalidarToken = (req, res) => {
    res.status(500).json({
        msg: 'porfavor contactar al admin'
    })
}

const crearUsuario = async (req, res) => {
    //crear un nuevo usuario
    try {
        const { email, password } = req.body
        let queryUser = await user.findOne({ email })

        if (queryUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        datauser = new user(req.body)
        // encriptar contraseña
        const salt = bcrypt.genSaltSync()
        datauser.password = bcrypt.hashSync(password, salt);
        await datauser.save()
        const token = await generarJWT(datauser.id, datauser.name);
        res.status(201).json({
            ok: true,
            uid: datauser.id,
            name: datauser.name,
            token
        })

    } catch (error) {

    }


}

module.exports = {
    revalidarToken,
    crearUsuario
}