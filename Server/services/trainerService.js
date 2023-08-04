const trainerRepository = require("../repositories/trainerRepository");

const trainerService = {
  signUp: async (username, email, password) => {
    try {
      const newTrainer = await trainerRepository.createNewTrainer(
        username,
        email,
        password
      );
      return newTrainer;
    } catch (error) {
      console.error("Error creating new trainer:", error);
      throw error;
    }
  },

  getAllHeroes: async () => {
    try {
      const heroes = await trainerRepository.getAllHeroes();
      return heroes;
    } catch (error) {
      console.error("Error fetching heroes:", error);
      throw error;
    }
  },
};

module.exports = trainerService;
