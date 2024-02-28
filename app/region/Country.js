const { DataTypes } = require('sequelize');
const db = require('../../config/db'); // Импортируйте настройки подключения к базе данных

const Country = db.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
  }
);

module.exports = Country;