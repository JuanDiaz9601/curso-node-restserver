const Role = require("../models/role");
const Usuario = require("../models/usuario");

//verificar si el rol existe
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
};

//verificar si el correo existe
const existeEmail = async (correo = "") => {
  const emailRegistrado = await Usuario.findOne({ correo });
  if (emailRegistrado) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

//verificar si el ID existe
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con ID ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
};
