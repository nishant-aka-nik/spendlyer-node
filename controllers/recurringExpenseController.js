import recurringExpenseModel from '../models/recurringExpense.js';
import logger from '../middleware/logger.js';

async function getRecurringExpensesByAccountId(accountIdToFind) {
  try {
    const recurringExpenses = await recurringExpenseModel.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (recurringExpenses.length > 0) {
      logger.info('Recurring Expenses:', recurringExpenses);

      return recurringExpenses.map(recurringExpense => {
        return {
          id: recurringExpense.dataValues.id,
          name: recurringExpense.dataValues.name,
          amount: recurringExpense.dataValues.amount,
          updatedAt: recurringExpense.dataValues.updatedAt
        };
      });
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
    const recurringExpense = await recurringExpenseModel.create({ account_id: req.account_id, name, amount });
    res.status(201).json(recurringExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recurring expense' });
  }

}

async function deleteRecurringExpense(req, res) {
  try {
    const id = req.params.id;

    // Assuming you've already imported and defined the RecurringExpense model
    const deletedCount = await recurringExpenseModel.destroy({
      where: { id, account_id: req.account_id}
    });

    if (deletedCount > 0) {
      res.status(204).send(); // 204 No Content for a successful deletion
    } else {
      res.status(404).json({ error: 'Recurring expense not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete recurring expense' });
  }

}

export default {
  getRecurringExpensesByAccountId,
  addRecurringExpense,
  deleteRecurringExpense
};