const Account = require('../models/account');
const logger = require('../middleware/logger');
const RecurringExpense = require('../models/recurringExpense');
const RecurringExpenseController = require('./recurringExpenseController');
const ExtraExpenseController = require('./extraExpenseController');
const InvestmentController = require('./investmentController');

// Fetch an account by username
async function getAccountByUsername(req, res) {
  const usernameToFind = req.params.username; // Get the username from the request query parameter

  if (!usernameToFind) {
    return res.status(400).json({ message: 'Username parameter is missing in the request.' });
  }

  try {
    const account = await Account.findOne({
      where: { username: usernameToFind }
    });

    if (account) {
      logger.info(account);
      const recurringExpenses = await RecurringExpenseController.getRecurringExpensesByAccountId(account.id)
      const extraExpenses = await ExtraExpenseController.getExtraExpensesByAccountId(account.id)
      const investment = await InvestmentController.getInvestmentByAccountId(account.id)

      const accountResponse = {
        account: {
          name: account.name,
          username: account.username,
          salary: account.salary,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt
        },
        recurringExpenses,
        extraExpenses,
        investment
      };

      res.json(accountResponse);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: JSON.stringify(err) });
  }
}

module.exports = {
  getAccountByUsername,
};
