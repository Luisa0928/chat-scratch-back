/**
 * Este modulo es un intermediario entre la comunicacion del servidor con la logica del negocio
 * a través de la transformacion de las peticiones y respuestas en especificaciones del  modulo
 * service
 * @module storageController
 */

/** Importa las funciones de service que contienen la logica del negocio,
 * para traducirlas al servidor */
const { uploadImageService } = require('../services/storageService');

/**
 * Extrae la foto enviada por el usuario en el servidor y se la entrega al service,
 * para que la almacene. luego, le confirma al cliente el exito de la operaicion.
 * @param {string} req requisitos que debe ingresar el usuario
 * @param {string} res respuesta que le otorga el servidor
 */
function uploadFiles(req, res) {
  const image = req.file;
  uploadImageService(image);
  res.status(200).send('OK');
}

module.exports = {
  /** Posee las respuestas que el servidor arroja segun la peticion del usuario */
  uploadFiles,
};
