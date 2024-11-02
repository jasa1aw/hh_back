const { Sequelize } = require('sequelize');

const db = new Sequelize('hh_back', 'postgres', 'rootAdmin', {
    host: 'postgresdb', // Измените 'localhost' на 'db'
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

db.authenticate()
.then(() => console.log('Database connected'))
.catch((err) => console.log('Error: ' + err));

module.exports = db;
