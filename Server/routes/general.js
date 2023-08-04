const express = require("express");
var router = express.Router();
const trainerService = require("../services/trainerService");
const createCustomResponse = require("../models/customResponse");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const trainers = await trainerService.getAllHeroes();
    const response = createCustomResponse(200, trainers);
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST users listing. */
router.post("/register", function (req, res, next) {
  res.send("respond with a resource ok ?");
});

module.exports = router;
