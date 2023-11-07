// Import necessary modules and your Sequelize instance
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import your Sequelize instance
import RecurringExpense from './recurringExpense.js'; // Correct import path

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
  salary: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'account', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});

export default Account;
