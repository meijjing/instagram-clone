/*
  dependencies
*/
const express = require("express");
var admin = require("firebase-admin");

var firebase = require('firebase');
var firebaseui = require('firebaseui');

/*
  config - express
*/
const app = express();

/*
  config - firebase
*/
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "instagram-clone-327715.appspot.com",
});

const db = admin.firestore();
let bucket = admin.storage().bucket();



/*
  endpoint - read post
*/
app.get("/posts", (request, response) => {
  // CORS
  response.set("Access-Control-Allow-Origin", "*");

  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
  endpoint - createPost
*/
app.post("/createPost", (request, response) => {
  // CORS
  response.set("Access-Control-Allow-Origin", "*");

  let fileData = {};
  console.log(fileData);

  // db.collection('posts').doc('').set()
  // response.send(response);
  console.log(response);
});




// Auth
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());


ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }
  ],
  // Other config options...
});






/*
  listen
*/
app.listen(process.env.PORT || 3000);

