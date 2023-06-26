// ExpenseForm.js
import React, { useState, useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (title && amount && date) {
      const newExpense = {
        id: new Date().getTime().toString(),
        title,
        amount: amount,
        date,
      };
  
      try {
        const response = await fetch('http://54.92.167.143:8080/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title,amount}),
        });
  
        if (response.ok) {
          // Expense saved successfully
          setTitle('');
          setAmount('');
          setDate('');
        } else {
          // Error occurred while saving expense
          console.error('Failed to save expense');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };
  

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
