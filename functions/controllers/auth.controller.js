const admin = require("../utils/firebase");
const firebase = require("../utils/firebase");
const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../utils");

// Sign up

module.exports.signUp = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    handle,
  } = req.body;
  let token, userId;

  // validate data
  const { valid, errors } = validateSignupData({
    email,
    password,
    confirmPassword,
    handle,
  });
  if (!valid) return res.status(400).json({ errors });

  return admin
    .firestore()
    .doc(`/users/${handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ hanlde: "this handle is already taken " });
      } else {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        userId,
        firstName,
        lastName,
        email,
        handle,
        creatAt: new Date().toISOString(),
      };
      return admin
        .firestore()
        .doc(`/users/${handle}`)
        .set({ ...userCredentials });
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use")
        return res.status(500).json({ email: "email already in use" });
      return res.status(500).json({ error: err.code });
    });
};

// Login

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validate data
  const { valid, errors } = validateLoginData({ email, password });
  if (!valid) return res.status(400).json({ errors });

  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/user-not-found")
        return res.status(500).json({ emai: "email not register" });
      else if (err.code === "auth/wrong-password")
        return res.status(403).json({ password: "wrong password" });
      return res.status(500).json({ error: err });
    });
};
