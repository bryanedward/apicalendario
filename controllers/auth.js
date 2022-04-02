const user = require("../models/user")

const revalidarToken = (req,res) => {
    res.status(500).json({
        msg:'porfavor contactar al admin'
    })
}

const crearUsuario =   async (req,res) => {
    const query = await user.find({})
    res.send(query)
}

module.exports = {
    revalidarToken,
    crearUsuario
}