// models/Favorites.js
const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('../auth/User')
const Resume = require('../resume/models/Resume')
const Vacancy =  require('../vacancy/models/Vacancy')

const Favorites = db.define('Favorites', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    resumeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Resume',
        key: 'id',
      },
      validate: {
        customValidator(value) {
          if (value && this.vacancyId) {
            throw new Error('Only one of resumeId or vacancyId should be populated.');
          }
        }
      }
    },
    vacancyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Vacancy',
        key: 'id',
      },
      validate: {
        customValidator(value) {
          if (value && this.resumeId) {
            throw new Error('Only one of resumeId or vacancyId should be populated.');
          }
        }
      }
    }
  }, {
    timestamps: false,
  });

// Define the Many-to-Many associations
User.belongsToMany(Resume, { through: Favorites, foreignKey: 'userId', otherKey: 'resumeId', as: 'favoriteResumes' });
User.belongsToMany(Vacancy, { through: Favorites, foreignKey: 'userId', otherKey: 'vacancyId', as: 'favoriteVacancies' });
Resume.belongsToMany(User, { through: Favorites, foreignKey: 'resumeId', otherKey: 'userId', as: 'usersWhoFavorited' });
Vacancy.belongsToMany(User, { through: Favorites, foreignKey: 'vacancyId', otherKey: 'userId', as: 'usersWhoFavorited' });

module.exports = Favorites;
