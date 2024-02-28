const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); 

const SpecializationType = db.define('SpecializationType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    },{
        timestamps: false, // Отключение автоматических полей createdAt и updatedAt
    }
);

module.exports = SpecializationType;