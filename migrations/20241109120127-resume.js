'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Resumes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      salary_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      main_language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skills: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Cities', // Ensure the table name for 'City' is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Ensure the table name for 'User' is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      citizenship: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Countries', // Ensure the table name for 'Country' is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      specializationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Specializations', // Ensure the table name for 'Specialization' is correct
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Resumes');
  }
};
