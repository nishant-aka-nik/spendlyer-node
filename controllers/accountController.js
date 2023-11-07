import accountModel from '../models/account.js';
import logger from '../middleware/logger.js';
import RecurringExpense from '../models/recurringExpense.js';
import { getRecurringExpensesByAccountId } from './recurringExpenseController.js';
import { getExtraExpensesByAccountId } from './extraExpenseController.js';
import { getInvestmentByAccountId } from './investmentController.js';

// Fetch an account by username
async function getAccountByUsername(req, res) {
  const usernameToFind = req.params.username; // Get the username from the request query parameter

  if (!usernameToFind) {
    return res.status(400).json({ message: 'Username parameter is missing in the request.' });
  }

  try {
    const account = await accountModel.findOne({
      where: { username: usernameToFind }
    });

    if (account) {
      logger.info(account);
      const recurringExpenses = await getRecurringExpensesByAccountId(account.id)
      const extraExpenses = await getExtraExpensesByAccountId(account.id)
      const investments = await getInvestmentByAccountId(account.id)

      const totalRecurringExpenses = recurringExpenses.map(expense => expense.amount).reduce((acc, amount) => acc + amount, 0);
      const totalExtraExpenses = extraExpenses.map(expense => expense.amount).reduce((acc, amount) => acc + amount, 0);
      const totalInvestments = investments.map(expense => expense.amount).reduce((acc, amount) => acc + amount, 0);


      const accountResponse = {
        account: {
          name: account.name,
          username: account.username,
          salary: account.salary,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
          totalRecurringExpenses: totalRecurringExpenses,
          totalExtraExpenses: totalExtraExpenses,
          totalInvestments: totalInvestments
        },
        recurringExpenses,
        extraExpenses,
        investments
      };

      res.json(accountResponse);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: JSON.stringify(err) });
  }
}

export default {
  getAccountByUsername,
};
