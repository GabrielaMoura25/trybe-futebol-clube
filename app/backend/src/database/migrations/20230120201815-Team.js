'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
     teamName: {
       type: Sequelize.STRING,
     },
   });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams')
  }
};
