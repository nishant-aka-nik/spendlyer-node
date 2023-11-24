const { Sequelize } = require('sequelize');
const config = require('./config');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Determine the environment
const environment = process.env.NODE_ENV || 'development';
const selectedConfig = config[environment];

// Replace with your database configuration
const sequelize = new Sequelize(selectedConfig.database, selectedConfig.username, selectedConfig.password, {
  host: selectedConfig.host,
  dialect: selectedConfig.dialect,
  // Additional options here
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync();


module.exports = sequelize;
