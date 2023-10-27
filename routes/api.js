const express = require('express');
const router = express.Router();
const recurringExpenseController = require('../controllers/recurringExpenseController');

// Define API routes
router.get('/recurring_expenses', recurringExpenseController.getAll);
router.get('/recurring_expenses/:id', recurringExpenseController.getById);

module.exports = router;
