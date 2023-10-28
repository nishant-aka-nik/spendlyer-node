const ExtraExpense = require('../models/extraExpenditure');
const logger = require('../middleware/logger');


async function getExtraExpensesByAccountId(accountIdToFind) {
  try {
    const extraExpenses = await ExtraExpense.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (extraExpenses.length > 0) {
      logger.info(extraExpenses);

      const extraExpensesRes = extraExpenses.map(extraExpense => {
        return {
          name: extraExpense.dataValues.name,
          amount: extraExpense.dataValues.amount,
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

module.exports = {
    getExtraExpensesByAccountId
};