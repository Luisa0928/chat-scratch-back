const admin = require('firebase-admin');
const serviceAccount = require('../secrets/firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = {
  auth,
};
