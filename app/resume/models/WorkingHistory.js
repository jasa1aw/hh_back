const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); // Импортируйте настройки подключения к базе данных
const Resume = require('./Resume')

const WorkingHistory = db.define('WorkingHistory', {
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsibilities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});

WorkingHistory.belongsTo(Resume, { foreignKey: 'resumeId' });
Resume.hasMany(WorkingHistory, { foreignKey: 'resumeId', as: "workingHistories" })

module.exports = WorkingHistory;