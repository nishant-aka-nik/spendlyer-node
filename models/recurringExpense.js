const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import your sequelize instance

const RecurringExpense = sequelize.define('RecurringExpense', {
  // Define your table schema here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = RecurringExpense;
