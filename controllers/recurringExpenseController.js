const RecurringExpense = require('../models/recurringExpense');
const logger = require('../middleware/logger');

async function getRecurringExpensesByAccountId(accountIdToFind) {
  try {
    const recurringExpenses = await RecurringExpense.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (recurringExpenses.length > 0) {
      logger.info('Recurring Expenses:', recurringExpenses);

      const recurringExpensesRes = recurringExpenses.map(recurringExpense => {
        return {
          name: recurringExpense.dataValues.name,
          amount: recurringExpense.dataValues.amount,
          updatedAt: recurringExpense.dataValues.updatedAt
        };
      });

      return recurringExpensesRes;
    } else {
      logger.info('No recurring expenses found for the account.');
      return [];
    }
  } catch (err) {
    logger.error('Error:', err);
    throw err;
  }
}

module.exports = {
  getRecurringExpensesByAccountId
};