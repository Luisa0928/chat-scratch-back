/**
 * Contiene la configuracion para conectarse con el servicio de almacenamiento de firebase
 * @module Config
 */
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const serviceAccount = require('../secrets/firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'auth-b0620.appspot.com',
});

const auth = admin.auth();

const storage = admin.storage();

const database = () => {
  const connectionParams = {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  };
  try {
    mongoose.connect('mongodb+srv://luisa0928:pe3qcDifyHONpURe@cluster0.omamckg.mongodb.net/?retryWrites=true&w=majority', connectionParams);
    console.log('Database connected');
  } catch (error) {
    console.log('Failed');
  }
};

module.exports = {
  /** Permite usar la libreria de autenticacion de firebase para validar permisos */
  auth,
  /** Permite usar la libreria de storage de firebase para administrar archivos */
  storage,
  database,
};
