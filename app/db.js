const Sequelize = require('sequelize');

const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', // or 'mysql', 'postgres', etc.
    storage: './database.sqlite' // For SQLite only
});

module.exports = database;
