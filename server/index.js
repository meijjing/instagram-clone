/*
  dependencies
*/
const express = require("express");
var admin = require("firebase-admin");

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

  // db.collection('posts').doc('').set()
  // response.send(response);
  console.log(response);
});

/*
  listen
*/
app.listen(process.env.PORT || 3000);
