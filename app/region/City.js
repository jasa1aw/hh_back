const { DataTypes } = require('sequelize');
const db = require('../../config/db'); // Импортируйте настройки подключения к базе данных
const Country = require('./Country')

const City = db.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
  }
);

City.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = City;