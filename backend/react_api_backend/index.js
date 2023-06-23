const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb'); // Uncomment this line for MongoDB connection
//const mysql = require('mysql'); // Uncomment this line for RDS MySQL connection
const mongoose=require('mongoose')
const cors=require('cors')
const app = express();
const PORT = 8080;
app.use(cors('*'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection configuration
mongoose.connect('mongodb+srv://binay:binay@cluster0.srewl22.mongodb.net/todo_ejs'
).then((res)=>console.log('connected to database')).catch((err)=>console.log(err))

app.use('/expenses',require('./routes/expensesRoutes'))
const db = mongoose.connection.collection('expenses');
// Read all expenses
app.get('/expenses', (req, res) => {
  // MongoDB query for read all expenses
  db.collection('expenses').find().toArray((err, expenses) => {
    if (err) {
      console.error('Failed to get expenses:', err);
      res.status(500).json({ error: 'Failed to get expenses' });
    } else {
      res.json(expenses);
    }
  });


  // RDS MySQL query for read all expenses
//   const query = 'SELECT * FROM expenses';
//   connection.query(query, (err, expenses) => {
//     if (err) {
//       console.error('Failed to get expenses:', err);
//       res.status(500).json({ error: 'Failed to get expenses' });
//     } else {
//       res.json(expenses);
//   }
// });
});

// Read a single expense
app.get('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;

  // MongoDB query for read single expense
  db.collection('expenses').findOne({ _id: mongodb.ObjectID(expenseId) }, (err, expense) => {
    if (err) {
      console.error('Failed to get expense:', err);
      res.status(500).json({ error: 'Failed to get expense' });
    } else if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
    } else {
      res.json(expense);
    }
  });

  // RDS MySQL query for read single expense
  // const query = 'SELECT * FROM expenses WHERE id = ?';
  // connection.query(query, [expenseId], (err, results) => {
  //   if (err) {
  //     console.error('Failed to get expense:', err);
  //     res.status(500).json({ error: 'Failed to get expense' });
  //   } else if (results.length === 0) {
  //     res.status(404).json({ error: 'Expense not found' });
  //   } else {
  //     res.json(results[0]);
  //   }
  // });
});

// Delete an expense
app.delete('/expenses/:id', (req, res) => {
  const expenseId = req.params.id;

  // MongoDB query for delete
  db.collection('expenses').deleteOne({ _id: mongodb.ObjectID(expenseId) }, (err, result) => {
    if (err) {
      console.error('Failed to delete expense:', err);
      res.status(500).json({ error: 'Failed to delete expense' });
    } else if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Expense not found' });
    } else {
      res.json({ message: 'Expense deleted successfully' });
    }
  });

  // RDS MySQL query for delete
  // const query = 'DELETE FROM expenses WHERE id = ?';
  // connection.query(query, [expenseId], (err, result) => {
  //   if (err) {
  //     console.error('Failed to delete expense:', err);
  //     res.status(500).json({ error: 'Failed to delete expense' });
  //   } else if (result.affectedRows === 0) {
  //     res.status(404).json({ error: 'Expense not found' });
  //   } else {
  //     res.json({ message: 'Expense deleted successfully' });
  //   }
  // });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

   
