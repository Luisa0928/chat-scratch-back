/**
 * En este modulo se ejecutan las peticiones que debe escuchar el servidor
 * @module Index
 * Desde este modulo el usuario realiza las solicitudes de autenticacion
 * y de administracion de archivos.
 */

/**
 * Se requiere la libreria de express para crear un servidor y un API
 */
const express = require('express');

/** Se importan las rutas que expecifican los metodos al servidor */
const { authRoute } = require('./src/routes/authRoutes');
const { stgRoute } = require('./src/routes/storageRoutes');

/** Se importa la funcion que carga el contenido del archivo env dentro del process.env */
require('dotenv').config();

const app = express();

/** Se especifica en el archivo extencion env. el puerto en el que se escuchan las peticiones */
app.set('port', process.env.PORT || 3000);

/** Express recibira las peticiones en formato json */
app.use(express.json());

/** Express recibira informacion a través de las URL */

app.use(express.urlencoded({ extended: true }));

/** Se le especifica a express que las peticiones que se especifiquen en postman,
 * deben empezar con la ruta auth/ */
app.use('/auth', authRoute);

/** Se le especifica a express que las peticiones que se especifiquen en postman,
 * deben empezar con la ruta storage */
app.use('/storage', stgRoute);

/** Contiene la ubicacion del puerto en el que se escucharan las peticiones */
app.listen(app.get('port'), () => {
  console.log(`server on port  ${app.get('port')}`);
});
