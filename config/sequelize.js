const { Sequelize } = require('sequelize');

// Replace with your database configuration
const sequelize = new Sequelize('spendlyzer', 'root', 'qwertyawsd', {
  host: 'localhost',
  dialect: 'mysql',
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
