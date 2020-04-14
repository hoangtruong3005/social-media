const admin = require("firebase-admin");

module.exports.getScreams = function (req, res) {
  admin
    .firestore()
    .collection("scream")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push(doc.data());
      });
      return res.json(screams);
    })
    .catch((err) => console.log(err));
};
