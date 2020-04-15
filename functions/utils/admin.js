var admin = require("firebase-admin");

var serviceAccount = require("../socialmedia-3005-firebase-adminsdk-jwvez-6a35a0388d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialmedia-3005.firebaseio.com",
});

module.exports = admin;
