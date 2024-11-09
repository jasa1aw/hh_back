'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SpecializationTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // Другие поля, если есть
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('SpecializationTypes');
  }
};
