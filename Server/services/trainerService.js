const trainerRepository = require("../repositories/trainerRepository");

const trainerService = {
  signUp: async (username, password) => {
    try {
      const newTrainer = await trainerRepository.createNewTrainer(
        username,
        password
      );
      return newTrainer;
    } catch (error) {
      console.error("Error creating new trainer:", error);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const newTrainer = await trainerRepository.checkUserAuth(
        username,
        password
      );
      return newTrainer;
    } catch (error) {
      console.error("Error login to trainer:", error);
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
  getHeroById: async (heroId) => {
    try {
      const hero = await trainerRepository.getSpecificHero(heroId);
      return hero;
    } catch (error) {
      console.error("Error fetching heroes:", error);
      throw error;
    }
  },

  updateHero: async (heroId, hero) => {
    try {
      const updatedHero = await trainerRepository.updateSpecificHero(
        heroId,
        hero
      );
      return updatedHero;
    } catch (error) {
      console.error("Error fetching heroes:", error);
      throw error;
    }
  },
};

module.exports = trainerService;
