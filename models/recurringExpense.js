// Import necessary modules and your Sequelize instance
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import your Sequelize instance

// Define the "RecurringExpense" model
const RecurringExpense = sequelize.define('RecurringExpense', {
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
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'uncategorized'
  },
}, {
  tableName: 'recurring_expenses', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});


module.exports = RecurringExpense;
