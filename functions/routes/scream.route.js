const express = require("express");
const router = express.Router();

const controller = require("../controllers/scream.controller");

router.get("/", controller.getScreams);

module.exports = router;
