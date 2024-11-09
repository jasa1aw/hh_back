'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Specializations', {
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
      specializationTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SpecializationTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Specializations');
  }
};
