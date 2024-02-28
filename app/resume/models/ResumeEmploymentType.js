const { DataTypes } = require('sequelize');
const db = require('../../../config/db'); 
const Resume = require('./Resume')
const EmploymentType = require('../../employment-type/EmploymentType')

const ResumeEmploymentTypes = db.define('ResumeEmploymentTypes', {
  // Additional attributes (if any) related to the relationship
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
},{
    timestamps: false, // Отключение автоматических полей createdAt и updatedAt
});


// Define the associations in the models
Resume.belongsToMany(EmploymentType, { through: ResumeEmploymentTypes, foreignKey: 'resumeId',
otherKey: 'employmentTypeId', as: "employmentTypes"});
EmploymentType.belongsToMany(Resume, { through: ResumeEmploymentTypes, foreignKey: 'employmentTypeId',
otherKey: 'resumeId'});


module.exports = ResumeEmploymentTypes;