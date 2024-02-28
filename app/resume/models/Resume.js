const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); // Импортируйте настройки подключения к базе данных
const City = require('../../region/City')
const User = require('../../auth/User')
const Country = require('../../region/Country')

const Resume = db.define('Resume', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  main_language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Resume.belongsTo(City, { foreignKey: 'cityId', as: 'city' });
Resume.belongsTo(User, { foreignKey: 'userId' });
Resume.belongsTo(Country, { foreignKey: 'citizenship', as: 'citizenshipObj' });

module.exports = Resume;