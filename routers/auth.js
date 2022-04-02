const { request } = require("express");
const { Router } = require("express");
const { check } = require("express-validator");
const { revalidarToken, crearUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router()



router.post('/nuevo', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'debe existir un email').isEmail(),
    check('password', 'contraseña es necesario').isLength({ min: 5 }),
    validarCampos],
    crearUsuario)


router.get('/', validarJWT, revalidarToken)

module.exports = router