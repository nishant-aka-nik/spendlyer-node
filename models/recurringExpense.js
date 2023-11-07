// Import necessary modules and your Sequelize instance
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Import your Sequelize instance

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
}, {
  tableName: 'recurring_expenses', // Specify the table name here
  timestamps: true, // Enable createdAt and updatedAt columns
});


export default RecurringExpense;
