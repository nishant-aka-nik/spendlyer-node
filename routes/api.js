const express = require('express');
const router = express.Router();
const recurringExpenseController = require('../controllers/recurringExpenseController');
const accountController = require('../controllers/accountController')

// Define API routes
router.get('/recurring_expenses', recurringExpenseController.getAll);
router.get('/user/:username', accountController.getAccountByUsername);

module.exports = router;
