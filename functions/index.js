const functions = require("firebase-functions");
const admin = require("./utils/admin");
const express = require("express");

const screamRoute = require("./routes/scream.route");
const authRoute = require("./routes/auth.route");

const app = express();

app.use("/screams", screamRoute);
app.use("/auth", authRoute);

exports.api = functions.https.onRequest(app);
