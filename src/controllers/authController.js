/**
 * Este modulo es un intermediario entre la comunicacion del servidor con la logica del negocio
 * a través de la transformacion de las peticiones y respuestas en especificaciones del  modulo
 * service
 * @module authController
 */

const {
  signInService,
  signUpService,
  verifyTokenService,
} = require('../services/authService');

/**
 *
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
  signIn,
  signUp,
  verifyToken,
};
