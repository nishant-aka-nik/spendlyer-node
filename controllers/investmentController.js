import investmentModel from '../models/investment.js';
import Account from '../models/account.js';
import logger from '../middleware/logger.js';

async function getInvestmentByAccountId(accountIdToFind) {
  try {
    const investment = await investmentModel.findAll({
      where: {
        account_id: accountIdToFind
      },
    });

    if (investment.length > 0) {
      logger.info(investment);

      const investmentRes = investment.map(investment => {
        return {
          id: investment.dataValues.id,
          name: investment.dataValues.name,
          amount: investment.dataValues.amount,
          type: investment.dataValues.type,
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
    const investment = await investmentModel.create({ account_id: req.account_id, name, amount, type });
    res.status(201).json(investment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create investment' });
  }
}

async function deleteInvestment(req, res) {
  try {
    const id = req.params.id;

    // Assuming you've already imported and defined the RecurringExpense model
    const deletedCount = await investmentModel.destroy({
      where: { id, account_id: req.account_id}
    });

    if (deletedCount > 0) {
      res.status(204).send(); // 204 No Content for a successful deletion
    } else {
      res.status(404).json({ error: 'Investment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete investment' });
  }

}

export default {
  getInvestmentByAccountId,
  addInvestment,
  deleteInvestment
};