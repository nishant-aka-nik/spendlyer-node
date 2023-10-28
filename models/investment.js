// Import necessary modules and your Sequelize instance
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import your Sequelize instance

// Define the "Investment" model
const Investment = sequelize.define('Investment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'investments', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});


module.exports = Investment;
