//toma la informacion del archivo .env y establece las variables de entorno
require("dotenv").config();
const Server = require("./models/server");

//const express = require("express");
//const app = express();

//app.get("/", function (req, res) {
//  res.send("Hola mundo!");
//});

//app.listen(process.env.PORT, () => {
//  console.log(`Servidor corriendo en el puerto`, process.env.PORT);
//});

const server = new Server();
//escucha al puerto definido en el metodo de mi clase server
server.listen();
