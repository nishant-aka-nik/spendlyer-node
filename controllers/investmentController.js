const Investment = require('../models/investment');
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

module.exports = {
  getInvestmentByAccountId
};