// Import necessary modules and your Sequelize instance
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import your Sequelize instance

// Define the "ExtraExpense" model
const ExtraExpense = sequelize.define('ExtraExpense', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'extra_expenses', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});


export default ExtraExpense;
