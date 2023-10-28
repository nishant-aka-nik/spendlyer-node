const Investment = require('../models/investment');
const Account = require('../models/account');
const logger = require('../middleware/logger');

async function getInvestmentByAccountId(accountIdToFind) {
  try {
    const investment = await Investment.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (investment.length > 0) {
      logger.info(investment);

      const investmentRes = investment.map(investment => {
        return {
          name: investment.dataValues.name,
          amount: investment.dataValues.amount,
          updatedAt: investment.dataValues.updatedAt
        };
      });

      return investmentRes;
    } else {
      logger.info('No investment found for the account.');
      return [];
    }
  } catch (err) {
    logger.error('Error:', err);
    throw err;
  }
}

async function addInvestment(req, res) {
  try {
    const usernameToFind = req.params.username; // Get the username from the request query parameter

    if (!usernameToFind) {
      return res.status(400).json({ message: 'Username parameter is missing in the request.' });
    }

    const account = await Account.findOne({
      where: { username: usernameToFind }
    });

    if (account) {
      logger.info(account);

      const { name, amount } = req.body;
      const investment = await Investment.create({ account_id: account.id, name, amount });
      res.status(201).json(investment);
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
}

module.exports = {
  getInvestmentByAccountId,
  addInvestment
};