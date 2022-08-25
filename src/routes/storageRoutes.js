/**
 * Este modulo contiene la expecificacion de los metodos de comunicacion con el servidor de express
 * @module storageRoutes
 */

const express = require('express');

const stgRoute = express.Router();

/**
 * Multer is a node.js middleware for handling multipart/form-data,
 * which is primarily used for uploading files.
 */
const multer = require('multer');

const uploadUtility = multer();

/**
 * @requires module {@link module: storageController}
 */const { uploadFiles } = require('../controllers/storageController');

/**
 * Con la funcion upload el usuario puede cargar archivos en el chat
 */
stgRoute.post('/upload', uploadUtility.single('image'), uploadFiles);

module.exports = {
  /** Permite exportar las rutas de los metodos */
  stgRoute,
};
