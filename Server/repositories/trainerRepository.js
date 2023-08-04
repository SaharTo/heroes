const db = require("../config/db");

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
  createNewTrainer: async (userName, email, password) => {
    const query = `INSERT INTO trainer (username, email, password)VALUES (?, ?, ?)`;
    const values = [userName, email, password];
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
        console.log("result - " + result.affectedRows);
        resolve(result);
      });
    });
  },
};

module.exports = trainerRepository;
