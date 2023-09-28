//Express basado en clases
const express = require("express");
const cors = require("cors");
const { dbConnetion } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.routerPath = "/api/usuarios";

    //Conectar con la base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnetion();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //Directirio publico
    this.app.use(express.static("public"));
  }

  //metodo para establecer las rutas
  routes() {
    //llamamos a las rutas
    this.app.use(this.routerPath, require("../routes/usuarios"));
  }

  //Escucha al puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto`, this.port);
    });
  }
}

module.exports = Server;
