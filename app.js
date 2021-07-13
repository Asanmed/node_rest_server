require('dotenv').config(); //para declarar variables de entorno

const Server = require('./models/server');

const myServer = new Server();

myServer.listen(); //inicia el server
