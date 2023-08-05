const db = require("../config/db");
const moment = require("moment");

const { comparePasswords } = require("../utils/utils");

const trainerRepository = {
  getAllHeroes: async () => {
    const query = `SELECT * FROM heroes`;
    return new Promise((resolve, reject) => {
      db.query(query, function (err, result) {
        if (err) {
          console.error("Error fetching heroes:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  createNewTrainer: async (userName, password) => {
    const query = `INSERT INTO trainer (username, password)VALUES (?, ?)`;
    const values = [userName, password];
    return new Promise((resolve, reject) => {
      db.query(query, values, function (err, result) {
        if (err) {
          console.error("Error inserting hero:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  getSpecificHero: async (heroId) => {
    const query = `SELECT * FROM heroes where id ='${heroId}'`;
    return new Promise((resolve, reject) => {
      db.query(query, function (err, result) {
        if (err) {
          console.error("Error fetching heroes:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  updateSpecificHero: async (heroId, updatedHeroData) => {
    const query = `UPDATE heroes SET start_date = '${moment(
      updatedHeroData.start_date
    ).format("YYYY-MM-DD HH:mm:ss")}', current_power = ${parseFloat(
      updatedHeroData.current_power
    ).toFixed(2)}, amount_of_daily_training = ${
      updatedHeroData.amount_of_daily_training
    } WHERE id = ${heroId}`;

    return new Promise((resolve, reject) => {
      db.query(query, function (err, result) {
        if (err) {
          console.error("Error updating hero:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  checkUserAuth: async (userName, password) => {
    const query = "SELECT * FROM trainer WHERE username = ?";

    return new Promise((resolve, reject) => {
      db.query(query, [userName], async (err, result) => {
        if (err) {
          console.error("Error while trying to validate trainer:", err);
          return reject(err);
        }

        if (result.length === 0) {
          // No user found with the provided username
          resolve(null);
        } else {
          const user = result[0];
          const passwordMatch = await comparePasswords(password, user.password);
          if (passwordMatch) {
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  addHero: async () => {
    const query = `
      INSERT INTO heroes (name, ability, guid_id, amount_of_daily_training)
      VALUES (?, ?, ?, ?)
    `;
    const values = ["super", "attacker", "44", "0"];

    return new Promise((resolve, reject) => {
      db.query(query, values, function (err, result) {
        if (err) {
          console.error("Error inserting hero:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = trainerRepository;
