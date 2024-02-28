const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); // Импортируйте настройки подключения к базе данных
const Resume = require('./Resume')

const Education = db.define('Education', {
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  major: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

Education.belongsTo(Resume, { foreignKey: 'resumeId' });
Resume.hasMany(Education, { foreignKey: 'resumeId', as: "education" })

module.exports = Education;