import extraExpenditureModel from '../models/extraExpenditure.js';
import logger from '../middleware/logger.js';


async function getExtraExpensesByAccountId(accountIdToFind) {
  try {
    const extraExpenses = await extraExpenditureModel.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (extraExpenses.length > 0) {
      logger.info(extraExpenses);

      const extraExpensesRes = extraExpenses.map(extraExpense => {
        return {
          id: extraExpense.dataValues.id,
          name: extraExpense.dataValues.name,
          amount: extraExpense.dataValues.amount,
          description: extraExpense.dataValues.description,
          updatedAt: extraExpense.dataValues.updatedAt
        };
      });

      return extraExpensesRes;
    } else {
      logger.error('No ExtraExpense found for the account.');
      return [];
    }
  } catch (err) {
    logger.error('Error:', err);
    throw err;
  }
}

async function addExtraExpense(req, res) {
  try {
    const { name, amount, description } = req.body;
    const extraExpense = await extraExpenditureModel.create({ account_id: req.account_id, name, amount, description });
    res.status(201).json(extraExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create extra expense' });
  }
}

async function deleteExtraExpense(req, res) {
  try {
    const id = req.params.id;

    // Assuming you've already imported and defined the RecurringExpense model
    const deletedCount = await extraExpenditureModel.destroy({
      where: { id, account_id: req.account_id}
    });

    if (deletedCount > 0) {
      res.status(204).send(); // 204 No Content for a successful deletion
    } else {
      res.status(404).json({ error: 'ExtraExpense not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete investment' });
  }

}

export default {
    getExtraExpensesByAccountId,
    addExtraExpense,
    deleteExtraExpense
};