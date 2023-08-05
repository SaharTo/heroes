const express = require("express");
const moment = require("moment");

var router = express.Router();
const trainerService = require("../services/trainerService");
const createCustomResponse = require("../models/customResponse");
const {
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
  hashPassword,
  createToken,
  comparePasswords,
} = require("../utils/utils");

/* POST new trainer. */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (isUsernameValid(username) && isPasswordValid(password)) {
      const hashedPassword = await hashPassword(password);
      const trainer = await trainerService.signUp(username, hashedPassword);

      if (trainer.affectedRows > 0) {
        const payload = { username: { username } };
        const token = createToken(payload);
        const response = createCustomResponse(
          200,
          "User Created Successfully",
          token
        );
        // res.cookie("access_token", token, { httpOnly: true, secure: true });

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

/* POST new trainer. */
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (isUsernameValid(username) && isPasswordValid(password)) {
      const trainer = await trainerService.login(username, password);
      if (trainer != null) {
        const payload = { username: { username } };
        const token = createToken(payload);
        const response = createCustomResponse(
          200,
          "User Login Successfully",
          token
        );
        res.cookie("access_token", token, { httpOnly: true, secure: true });
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

/* POST boost hero. */
router.post("/train/:heroId", async (req, res, next) => {
  const heroId = req.params.heroId;
  try {
    const arrayOfHero = await trainerService.getHeroById(heroId);
    const hero = arrayOfHero[0];
    if (!hero) {
      const response = createCustomResponse(404, {
        message: "Hero not found",
      });
      return res.send(response);
    }

    const now = new Date();
    const startDate = new Date(hero.start_date);

    const timeSinceStart = now - startDate;
    const hoursSinceStart = timeSinceStart / (1000 * 60 * 60); // Convert milliseconds to hours

    if (hero.amount_of_daily_training < 5 && hoursSinceStart < 24) {
      const powerGrowthPercentage = Math.random() * 0.1; // Random growth between 0% to 10%
      hero.current_power *= 1 + powerGrowthPercentage;
      hero.amount_of_daily_training += 1;

      //update the hero current_power and amount_of_daily_training
      const updatedHero = await trainerService.updateHero(hero.id, hero);

      const response = createCustomResponse(200, {
        message: "Training successful",
      });
      res.send(response);
    } else if (hoursSinceStart >= 24) {
      // Reset training for a new day
      hero.amount_of_daily_training = 1;
      hero.start_date = now;

      //update the hero amount_of_daily_training and startDate
      const updatedHero = await trainerService.updateHero(hero.id, hero);

      const response = createCustomResponse(200, {
        message: "New training day started",
      });
      res.send(response);
    } else {
      const response = createCustomResponse(400, {
        message: "Maximum daily training reached",
      });
      return res.send(response);
    }
  } catch (error) {
    const response = createCustomResponse(500, {
      message: "Internal server error",
    });
    return res.send(response);
  }
});

module.exports = router;
