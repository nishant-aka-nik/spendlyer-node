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
    const { name, amount, type } = req.body;
    const investment = await Investment.create({ account_id: req.account_id, name, amount, type });
    res.status(201).json(investment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
}

module.exports = {
  getInvestmentByAccountId,
  addInvestment
};