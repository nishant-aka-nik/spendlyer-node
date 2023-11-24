const Account = require('../models/account');
const logger = require('../middleware/logger');
const RecurringExpense = require('../models/recurringExpense');
const RecurringExpenseController = require('./recurringExpenseController');
const ExtraExpenseController = require('./extraExpenseController');
const InvestmentController = require('./investmentController');
const bcrypt = require('bcrypt');

/*
----------------------------------------------------------------------------------------------------
*/
// Fetch an account by username
async function getAccountDetailsByUsername(req, res) {
  const usernameToFind = req.params.username; // Get the username from the request query parameter
  logger.info(`username in request: ${usernameToFind}`);

  if (!usernameToFind) {
    return res.status(400).json({ message: 'Username parameter is missing in the request.' });
  }

  try {
    const account = await Account.findOne({
      where: { username: usernameToFind }
    });

    if (account) {
      logger.info(`account: ${account}`);
      const recurringExpenses = await RecurringExpenseController.getRecurringExpensesByAccountId(account.id)
      const extraExpenses = await ExtraExpenseController.getExtraExpensesByAccountId(account.id)
      const investments = await InvestmentController.getInvestmentByAccountId(account.id)

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
        investments
      };
      logger.info(`account response: ${accountResponse}`);

      res.json(accountResponse);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Internal server error', message: JSON.stringify(err) });
  }
}

// create account
async function createAccount(req, res) {
  try {
    const { name, username, salary, hasCreditCard, password } = req.body;

    const fetchedAccount = await getAccountByUsername(username)
    if (fetchedAccount) {
      return res.status(400).json({ message: 'Account username exist' });
    }

    const hashedPassword = await hashPassword(password);

    const account = await Account.create({ name, username, salary, hasCreditCard, password: hashedPassword });
    logger.info(`account datavalues: ${JSON.stringify(account.dataValues)}`);

    res.status(200).json({ message: 'Account successfully created', userId: account.dataValues.id });

  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to create account' });
  }
}

async function deleteAccount(req, res) {
  try {
    const usernameToDelete = req.params.username; // Get the username from the request query parameter
    const userPassword = req.params.password; // Get the password from the request query parameter

    //parameter validation
    if (!usernameToDelete) {
      return res.status(400).json({ message: 'Username parameter is missing in the request.' });
    } else if (!userPassword) {
      return res.status(400).json({ message: 'password parameter is missing in the request.' });
    }

    //password validation
    validatePassword(userPassword, usernameToDelete).then((match) => {
      if (match) {
        //delete account from the db
        logger.info(`account deletion started for username: ${usernameToDelete}`)
        Account.destroy({
          where: {
            // Your condition goes here
            username: usernameToDelete,
          },
        }).then((rowsDeleted) => {
          if (rowsDeleted > 0) {
            return res.status(200).json({ message: 'Account successfully deleted' });
          } else {
            throw new Error(`0 rows being deleted`)
          }
        }).catch((error) => {
          logger.error(`account deletion failed in db due to internal db error for username: ${usernameToDelete} error: ${error}`)
          return res.status(500).json({ message: 'account deletion failed' });
        });

      } else {
        return res.status(400).json({ message: 'incorrect password' });
      }
    }).catch((error) => {
      throw new Error(`error occurred during password validation: ${error}`)
    });

  } catch (error) {
    logger.error(`account deletion failed error: ${error}`)
    res.status(500).json({ error: 'Failed to delete account' });
  }
}

// Hash a password before storing it in the database
const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // Number of salt rounds for bcrypt

  try {
    const hashedPassword = await bcrypt.hash(String(plainPassword), saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Validate a password during the login process
const validatePassword = async (plainPassword, usernameToDelete) => {
  const account = await getAccountByUsername(usernameToDelete);

  if (account) {
    const hashedPassword = account.dataValues.password
    return match = await bcrypt.compare(plainPassword, hashedPassword);
  };
};

const getAccountByUsername = async (usernameToFind) => {
  const account = await Account.findOne({
    where: { username: usernameToFind }
  });

  if (account) {
    return account
  } 
  return null
}

module.exports = {
  getAccountDetailsByUsername,
  createAccount,
  deleteAccount
};