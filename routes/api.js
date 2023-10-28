const express = require('express');
const router = express.Router();
const recurringExpenseController = require('../controllers/recurringExpenseController');
const accountController = require('../controllers/accountController')
const investmentController = require('../controllers/investmentController')

// Define API routes
//-------------------------account----------------
router.get('/user/:username', accountController.getAccountByUsername);
//-------------------------account----------------

//-------------------------investment----------------
router.post('/:username/investment',investmentController.addInvestment);
//-------------------------investment----------------

//-------------------------recurring-expenses----------------
//-------------------------recurring-expenses----------------

//-------------------------extra-expenses----------------
//-------------------------extra-expenses----------------


module.exports = router;
