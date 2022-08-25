/**
 * Este modulo es un intermediario entre la comunicacion del servidor con la logica del negocio
 * a través de la transformacion de las peticiones y respuestas en especificaciones del  modulo
 * service
 * @module authController
 */

/** Importa las funciones de service que contienen la logica del negocio,
 * para traducirlas al servidor */
const {
  signInService,
  signUpService,
  verifyTokenService,
} = require('../services/authService');

/**
 * Recibe la peticion de los usuarios que desean ingresar al chat y valida si las credenciales
 * de ingreso son correctas, completan o equivocdas para enviar un mensaje de error
 * @param {string} req requisitos que debe ingresar el usuario
 * @param {string} res respuesta que le otorga el servidor
 */
function signIn(req, res) {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      error: {
        status: 400,
        message: 'Missing email field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  if (!password) {
    res.status(400).send({
      error: {
        status: 400,
        message: 'Missing password field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  signInService(
    email,
    password,
    /* onSuccess function */
    (token) => {
      res.status(200).send({ error: false, data: { token } });
    },
    /* onError function */
    () => {
      res.status(403).send({
        error: {
          status: 403,
          message: 'Wrong email or password',
          help: 'http://www.chatConSenin/docs/errors/400.com',
        },
        data: false,
      });
    },
  );
}

/**
 * Recibe la peticion de los usuarios que se registran por primera vez para crear una cuenta,
 * y valida si las datos estan completos o si la cuenta ya existe para enviar un mensaje al usuario.
 * @param {string} req requisitos que debe ingresar el usuario
 * @param {string} res respuesta que le otorga el servidor
 */
function signUp(req, res) {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      error: {
        status: 400,
        message: 'Missing email field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  if (!password) {
    res.status(400).send({
      error: {
        status: 400,
        message: 'Missing password field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  signUpService(
    email,
    password,
    /* onCreate function */
    (user) => {
      res.status(200).send({ error: false, data: { user } });
    },
    /* onError function */
    () => {
      res.status(403).send({
        error: {
          status: 403,
          message: 'A user with that email already exists',
          help: 'http://www.chatConSenin/docs/errors/403.com',
        },
        data: false,
      });
    },
  );
}
/**
 * Verifica que el usuario haya ingresado el correo de su cuenta y valida si el token para ese
 * correo es el token que autoriza el servicio de autencticacion.
 * Envia un mensaje de si/no autorizacion.
 * @param {string} req requisitos que debe ingresar el usuario
 * @param {string} res respuesta que le otorga el servidor
 */
function verifyToken(req, res) {
  const { email, token } = req.body;
  if (!email) {
    res.status(400).send({
      error: {
        status: 400,
        message: 'Missing email field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  if (!token) {
    res.status(401).send({
      error: {
        status: 401,
        message: 'Missing token field in request',
        help: 'http://www.chatConSenin/docs/errors/400.com',
      },
      data: false,
    });
  }
  verifyTokenService(
    email,
    token,
    /* onSuccess function */
    () => {
      res.status(200).send({ error: false, data: { authorized: true } });
    },
    /* onError function */
    () => {
      res.status(403).send({
        error: {
          status: 403,
          message: 'Unauthorized',
          help: 'http://www.chatConSenin/docs/errors/400.com',
        },
        data: false,
      });
    },
  );
}

module.exports = {
  /** Valido la autorizacion de ingreso de un usuario a una cuenta ya creada */
  signIn,
  /** Creo por primera vez la cuenta de un nuevo usuario, si no exitia */
  signUp,
  /** Valido que el correo otorgado por el usuario,corresponda al token autorizado */
  verifyToken,
};
