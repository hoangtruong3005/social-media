const express = require("express");
const router = express.Router();

const {
  getScreams,
  createScream,
} = require("../controllers/scream.controller");

// GET method
router.get("/", getScreams);

// POST method
router.post("/scream", createScream);

module.exports = router;
