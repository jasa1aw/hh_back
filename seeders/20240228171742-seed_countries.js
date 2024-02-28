'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', [
      { name: 'Россия' },
      { name: 'Украина' },
      { name: 'Беларусь' },
      { name: 'Казахстан' },
      { name: 'Армения' },
      { name: 'Азербайджан' },
      { name: 'Грузия' },
      { name: 'Молдова' },
      { name: 'Таджикистан' },
      { name: 'Туркменистан' },
      { name: 'Узбекистан' },
      { name: 'Кыргызстан' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
