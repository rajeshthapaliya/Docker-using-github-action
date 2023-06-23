const router = require('express').Router();
const Expenses = require('../models/expenseModel');

router.post('/', async (req, res) => {
  const { title, amount } = req.body;
  const expense = new Expenses({ title, amount });

  try {
    await expense.save();
    res.status(200).json({ message: 'Expense saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

router.get('/', async (req, res) => {
    const expense = await Expenses.find({ });
  
    try {
      res.status(200).json({ data: expense });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save expense' });
    }
  });
module.exports = router;
