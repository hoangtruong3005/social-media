const admin = require("../utils/admin");

module.exports.getScreams = (req, res) => {
  return admin
    .firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          ...doc.data(),
          screamId: doc.id,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

module.exports.createScream = (req, res) => {
  if (req.body.content.trim() === "")
    return res.status(400).json({ error: "content must not be empty" });
  const newScream = {
    content: req.body.content,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  return admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      return res.json(resScream);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Do something wrong" });
    });
};
