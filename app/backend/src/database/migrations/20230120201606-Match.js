'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,

      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,

      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
