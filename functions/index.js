const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const screamRoute = require("./routes/scream.route");

const app = express();

admin.initializeApp();

// exports.getScream = functions.https.onRequest((req, res) => {
//   admin
//     .firestore()
//     .collection("scream")
//     .get()
//     .then((querySnapshot) => {
//       let screams = [];

//       querySnapshot.forEach((doc) => {
//         screams.push(doc.data());
//       });
//       return res.json(screams);
//     })
//     .catch((err) => console.log(err));
// });

app.use("/screams", screamRoute);

exports.createScream = functions.https.onRequest((req, res) => {
  const { body, userHanlde } = req.body;
  const newScream = {
    body,
    userHanlde,
    creatAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  admin
    .firestore()
    .collection("scream")
    .add(newScream)
    .then((doc) => {
      return res.json({ message: `scream ${doc.id} added` });
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.api = functions.https.onRequest(app);
