const { Router } = require("express");
const { check } = require("express-validator");
const {
  revalidarToken,
  crearUsuario,
  ingresoUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router();

router.post(
  "/nuevo",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "debe existir un email").isEmail(),
    check("password", "contraseña es necesario").isLength({ min: 5 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "el correo es obligatorio").not().isEmpty(),
    check("password", "el pass debe existir").isLength({ min: 5 }),
    validarCampos,
  ],
  ingresoUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
