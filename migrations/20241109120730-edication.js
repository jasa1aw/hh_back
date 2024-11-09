'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      university_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      faculty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      major: {
        type: Sequelize.STRING,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      resumeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Resumes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
