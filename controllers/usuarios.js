const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { usuario, status } = req.query;

  res.json({
    msg: "get API desde controllers",
    usuario,
    status,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API desde controllers",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  //desestructuramos el body de la peticion req
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API desde controllers",
    nombre,
    edad,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API desde controllers",
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
