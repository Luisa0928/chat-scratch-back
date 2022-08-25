/**
 * Este modulo contiene la logica del negocio,
 * a través de la funcion que administra la multimedia subida por los usuarios.
 * @module storageService
 */

/** Libreria de autenticacion de firebase que me permite aceder a la informacion de los usuarios */
const { storage } = require('../configs/Configs');

const bucket = storage.bucket();

const destPath = 'chats/luisaDavid/';

async function uploadImageService(image) {
  await bucket.file(destPath + image.originalname).save(image.buffer);
  console.log(`Uploaded ${image.originalname} to fb`);
}

module.exports = {
  /** Valido la autorizacion de ingreso de un usuario a una cuenta ya creada */
  uploadImageService,
};
