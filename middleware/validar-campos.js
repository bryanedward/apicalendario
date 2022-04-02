const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(404).json({
            ok: false,
            errors: err.mapped()
        })
    }
    next()
}

module.exports = {
    validarCampos
}