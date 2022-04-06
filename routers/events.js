const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/event");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const router = Router()

router.use(validarJWT)

router.get('/', getEventos);
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        // check('start','Fecha de inicio es obligatoria').isDate(),
        // check('end','Fecha de finalización es obligatoria').isDate(),
        validarCampos
    ],
    crearEvento 
);

router.put('/:id',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    // check('start','Fecha de inicio es obligatoria').isDate(),
    // check('end','Fecha de finalización es obligatoria').isDate(),
    validarCampos
] ,actualizarEvento)
router.delete('/:id', eliminarEvento)

module.exports = router