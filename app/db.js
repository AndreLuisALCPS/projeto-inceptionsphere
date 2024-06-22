const Sequelize = require('sequelize');

const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: './database.sqlite' 
});

module.exports = database;