const express = require("express");

const { signUp, login } = require("../controllers/auth.controller");

const router = express.Router();

// GET method

// Post method
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
