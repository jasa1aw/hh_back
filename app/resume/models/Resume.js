const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); // Импортируйте настройки подключения к базе данных
const City = require('../../region/City')
const User = require('../../auth/User')
const Country = require('../../region/Country')
const Specialization = require('../../specializations/models/Specialization')

const Resume = db.define('Resume', {
  about: {
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
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
Resume.belongsTo(City, { foreignKey: 'cityId', as: 'city' });
Resume.belongsTo(User, { foreignKey: 'userId' });
Resume.belongsTo(Country, { foreignKey: 'citizenship', as: 'citizenshipObj' });
Resume.belongsTo(Specialization, { foreignKey: 'specializationId', as: 'specialization' });

module.exports = Resume;