const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBTeB4g6zkp8iXvbXEJzX_AmYkjLFsABdg",
  authDomain: "socialmedia-3005.firebaseapp.com",
  databaseURL: "https://socialmedia-3005.firebaseio.com",
  projectId: "socialmedia-3005",
  storageBucket: "socialmedia-3005.appspot.com",
  messagingSenderId: "1003591540561",
  appId: "1:1003591540561:web:a8f480eb7470635f8afd70",
  measurementId: "G-M6MMFYBJ86",
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
