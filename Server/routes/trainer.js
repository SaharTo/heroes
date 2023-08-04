const express = require("express");

var router = express.Router();
const trainerService = require("../services/trainerService");
const createCustomResponse = require("../models/customResponse");
const {
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
  hashPassword,
} = require("../utils/utils");

/* POST new trainer. */
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      isUsernameValid(username) &&
      isPasswordValid(password) &&
      isEmailValid(email)
    ) {
      const hashedPassword = await hashPassword(password);
      const trainer = await trainerService.signUp(
        username,
        email,
        hashedPassword
      );

      if (trainer.affectedRows > 0) {
        const response = createCustomResponse(200, "User Created Successfully");
        res.send(response);
      } else {
        const response = createCustomResponse(400, "Error Occured");
        res.status(400).json(response);
      }
    } else {
      const response = createCustomResponse(400, "Invalid user credentials");
      res.status(400).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
