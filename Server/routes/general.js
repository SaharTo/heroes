const express = require("express");
var router = express.Router();
const trainerService = require("../services/trainerService");
const createCustomResponse = require("../models/customResponse");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: "Token verification failed" });
      }

      const trainers = await trainerService.getAllHeroes();
      trainers.sort((a, b) => b.current_power - a.current_power); // Sort in descending order of current_power
      const response = createCustomResponse(200, trainers);
      res.send(response);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* POST users listing. */
router.post("/register", function (req, res, next) {
  res.send("respond with a resource ok ?");
});

module.exports = router;
