const { Sequelize } = require('sequelize');

// Replace with your database configuration
const sequelize = new Sequelize('spendlyzer', 'root', 'qwertyawsd', {
  host: 'localhost',
  dialect: 'mysql',
  // Additional options here
});

module.exports = sequelize;
