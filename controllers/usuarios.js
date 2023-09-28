const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  //desestructuramos el query para obtener el limite
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuario = await Usuario.find(query).limit(Number(limite)).skip(desde);
  // const total = await Usuario.countDocuments(query);
  const [total, usuario] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(desde),
  ]);

  res.json({ total, usuario });
};

const usuariosPut = async (req, res = response) => {
  //por medio de parmas enviamos el id en la url
  const { id } = req.params;
  //Se define que propiedades de mi objeto van hacer ignoradas
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra la base de datos
  if (password) {
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuarioActualizado);
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  //Creamos una instancia de nuestro modelo que recibe los parametros del body
  const usuario = new Usuario({ nombre, correo, password, rol });

  //el numero de vueltas para la encriptacion
  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  // Borramos fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API desde controllers",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
