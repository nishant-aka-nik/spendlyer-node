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

async function addRecurringExpense(req, res) {
  try {
    const { name, amount } = req.body;
    const recurringExpense = await RecurringExpense.create({ account_id: req.account_id, name, amount });
    res.status(201).json(recurringExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recurring expense' });
  }

}

module.exports = {
  getRecurringExpensesByAccountId,
  addRecurringExpense
};