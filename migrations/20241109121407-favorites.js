'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Make sure the table name is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      resumeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Resumes', // Make sure the table name is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vacancyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vacancies', // Make sure the table name is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};
