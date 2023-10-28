const RecurringExpense = require('../models/recurringExpense');
const logger = require('../middleware/logger');


// Fetch all recurring expenses
async function getAll(req, res) {
  try {
    const allExpenses = await RecurringExpense.findAll();
    logger.info(allExpenses);
    res.json(allExpenses);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: JSON.stringify(err) });
  }
}

// Fetch a specific recurring expense by ID
async function getById(req, res) {
  const id = req.params.id;
  try {
    const expense = await findByPk(id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
  getAll,
  getById,
  getRecurringExpensesByAccountId
};