// Import necessary modules and your Sequelize instance
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import your Sequelize instance
const RecurringExpense = require('./recurringExpense'); // Correct import path

// Define the "Account" model
const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  hasCreditCard: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'account', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});

module.exports = Account;
