const validarJWT = (req,res, next) => {
    // validar si llega un token
    const token = req.header('token')
    if(!token){
        res.status(404).json({
            message:'no hay token'
        })
    }

    try {
        
    } catch (error) {
        return res.status(401).json({
            message:'token expiro'
        })
    }
    next()
}


module.exports = {
    validarJWT
}