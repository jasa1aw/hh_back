const {DataTypes} = require('sequelize');
const db = require('../../config/db');
const Role = require('./Role')
const company = require('./Company');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    full_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    },
    {
        timestamps: false,// Отключение автоматических полей createdAt и updatedAt
    });

    User.belongsTo(Role, {foreignKey: 'roleId'});
    User.belongsTo(company, {foreignKey: 'companyId'});

    module.exports = User;