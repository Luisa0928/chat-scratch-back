/**
 * Este modulo contiene la logica del negocio,
 * a través de funciones que contienen las instrucciones para la validacion de usuarios.
 * @module authService
 */

/** Esta libreria me permite hacer peticiones a funcionalidades creadas por terceros */
const axios = require('axios');

/** Libreria de autenticacion de firebase que me permite aceder a la informacion de los usuarios */
const { auth } = require('../configs/Configs');

/** API key del proyecto de autenticacion */
const { key } = require('../secrets/fbKey');

/** Se importa la funcion que carga el contenido del archivo env dentro del process.env  */
require('dotenv').config();

/** Se llama a la URL guardada en el archivo env */
const url = process.env.FB_SIGNIN_URL;

/**
 * Funcion que consulta en el servicio de validacion el correo y la contraseña del usuario,
 * para devolver un token o restringir el acceso si las credenciales no son validas
 * @param {String} email correo otrogado por el usuario para acceder al chat
 * @param {String} password contraseña otrogado por el usuario para acceder al chat
 * @param {Callback} onSuccess si la validacion de las credenciales es exitosa se otroga el token
 * @param {Callback} onError si la validacion de las credenciales falla se restringe el acceso
 */

async function signInService(email, password, onSuccess, onError) {
  axios
    .post(url + key, {
      email,
      password,
      returnSecureToken: true,
    }).then((response) => {
      const { data } = response;
      const token = data.idToken;
      onSuccess(token);
    })
    .catch((error) => {
      console.error(error);
      onError();
    });
}

/**
 * Funcion que autoriza o niega la creacion de una nueva cuenta de chat con las,
 * credenciales otrogadas por el usuario.
 * @param {String} email correo otrogado por el usuario para crear una nueva cuenta
 * @param {String} password contraseña creada por el usuario para acceder al chat
 * @param {Callback} onCreate si las credenciales no son de una cuenta existente,crea nueva cuenta
 * @param {Callback} onError si las credenciales pertecenen a otra cuenta,impide crear una nueva
 */
function signUpService(email, password, onCreate, onError) {
  auth.createUser({
    email,
    password,
  })
    .then((userRecord) => {
      onCreate(userRecord);
    })
    .catch((error) => {
      console.error(error);
      onError();
    });
}

/**
 * Funcion que autoriza o niega la creacion de una nueva cuenta de chat con las,
 * credenciales otrogadas por el usuario.
 * @param {String} email correo otrogado por el usuario para ingresar a su cuenta
 * @param {String} token es un codigo creado por firebase que permite comprobar si las credenciales
 * otorgadas por el usuario, coinciden con las credenciales validas de una cuenta existente
 * @param {Callback} onSuccess si las credenciales no son de una cuenta existente,crea nueva cuenta
 * @param {Callback} onError si las credenciales pertecenen a otra cuenta,impide crear una nueva
 */
function verifyTokenService(mEmail, token, onSuccess, onError) {
  auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      const { email } = decodedToken;
      if (mEmail === email) onSuccess();
      else onError();
    })
    .catch((error) => {
      console.error(error);
      onError();
    });
}

module.exports = {
  signInService,
  signUpService,
  verifyTokenService,
};
