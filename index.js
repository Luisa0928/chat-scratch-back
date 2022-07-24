var admin = require("firebase-admin");
var axios = require("axios");
var serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var auth = admin.auth();


const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkrwOh9qnx5nh85kVKFluIQDjzvRn4f-U";

axios
  .post(url, {
    email: "test@gmail.com",
    password: "pass1234",
    returnSecureToken: true,
  })
  .then((response) => {
    var data = response.data;
    var token = data.idToken;
    console.log(token);
    auth
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
      })
      .catch((error) => {
        console.log("error con esto:" + error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
