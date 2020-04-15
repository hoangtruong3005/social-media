const express = require("express");
const router = express.Router();
const { FBAuth } = require("../middlewares/scream.middleware");

const {
  getScreams,
  createScream,
} = require("../controllers/scream.controller");

// GET method
router.get("/", getScreams);

// POST method
router.post("/scream", FBAuth, createScream);

module.exports = router;
