/**
 * Este modulo contiene la expecificacion de los metodos de comunicacion con el servidor de express
 * @module authRoutes
 */

const express = require('express');

const authRoute = express.Router();
/**
 * @requires module {@link module: authController}
 */
const { signIn, signUp, verifyToken } = require(
  '../controllers/authController',
);

/**
 * Con la funcion signUp valido el ingreso de un usuario a su cuenta
 */
authRoute.post('/signIn', signIn);

/**
 * Con la funcion signIn realizo el registro de usuarios al chat
 */
authRoute.post('/signUp', signUp);

/**
 * Con la funcion verifyToken valido a través del token que me otorga
 * firebase que el correo que me entrega el usuario es el correo
 * registrado para ese token
 */
authRoute.post('/verifyToken', verifyToken);

module.exports = {
  /** Permite exportar las rutas de los metodos */
  authRoute,
};
