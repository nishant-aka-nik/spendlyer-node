const express = require('express');
const router = express.Router();
const recurringExpenseController = require('../controllers/recurringExpenseController');
const accountController = require('../controllers/accountController')
const investmentController = require('../controllers/investmentController')
const accountValidation = require('../middleware/accountValidation');

// Define API routes
//-------------------------account----------------
router.get('/user/:username', accountController.getAccountByUsername);
//-------------------------account----------------

//-------------------------investment----------------
router.post('/:username/investment', accountValidation.validateAccount, investmentController.addInvestment);
//-------------------------investment----------------

//-------------------------recurring-expenses----------------
router.post('/:username/recurring-expense', accountValidation.validateAccount, recurringExpenseController.addRecurringExpense);
//-------------------------recurring-expenses----------------

//-------------------------extra-expenses----------------
//-------------------------extra-expenses----------------


module.exports = router;