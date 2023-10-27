const RecurringExpense = require('../models/recurringExpense');

// Fetch all recurring expenses
exports.getAll = async (req, res) => {
  try {
    const expenses = await RecurringExpense();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a specific recurring expense by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const expense = await RecurringExpense.findByPk(id);
    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
    } else {
      res.json(expense);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
