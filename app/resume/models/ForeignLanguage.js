const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); // Импортируйте настройки подключения к базе данных
const Resume = require('./Resume')

const ForeignLanguage = db.define('ForeignLanguage', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

ForeignLanguage.belongsTo(Resume, { foreignKey: 'resumeId' });
Resume.hasMany(ForeignLanguage, { foreignKey: 'resumeId', as: "foreignLanguages" })


module.exports = ForeignLanguage;