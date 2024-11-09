const {DataTypes} = require('sequelize');
const db = require('../../config/db');
const Role = require('./Role')
const Company = require('./Company');

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
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    },
    {
        timestamps: false,// Отключение автоматических полей createdAt и updatedAt
    });
    if (Role && Role.init instanceof Function) {
        User.belongsTo(Role, { foreignKey: 'roleId' });
    } else {
        console.error('Ошибка: Role не является моделью Sequelize');
    }
    
    if (Company && Company.init instanceof Function) {
        User.belongsTo(Company, { foreignKey: 'companyId' });
    } else {
        console.error('Ошибка: Company не является моделью Sequelize');
    }
    module.exports = User;