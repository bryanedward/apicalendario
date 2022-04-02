const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(404).json({
            err
        })
    }
    next()
}

module.exports = {
    validarCampos
}