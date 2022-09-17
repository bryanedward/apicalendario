const bcrypt = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const user = require("../models/user");

const revalidarToken = async (req, res) => {
  const { uid, name } = req;
  // Generar JWT
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

const crearUsuario = async (req, res) => {
  //crear un nuevo usuario
  try {
    const { email, password } = req.body;
    let queryUser = await user.findOne({ email });

    if (queryUser) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    datauser = new user(req.body);
    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    datauser.password = bcrypt.hashSync(password, salt);
    await datauser.save();
    const token = await generarJWT(datauser.id, datauser.name);
    res.status(201).json({
      ok: true,
      uid: datauser.id,
      name: datauser.name,
      token,
    });
  } catch (error) {}
};

const ingresoUsuario = async (req, res) => {
  //login del sistema
  try {
    const { email, password } = req.body;
    const usuario = await user.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El email no existe",
      });
    }
    const validarPass = bcrypt.compareSync(password, usuario.password);

    if (!validarPass) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {}
};

module.exports = {
  revalidarToken,
  crearUsuario,
  ingresoUsuario,
};
