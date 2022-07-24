const axios = require('axios');

const { auth } = require('../configs/authConfigs');

const { key } = require('../secrets/fbKey');

require('dotenv').config();

const url = process.env.FB_SIGNIN_URL;

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
