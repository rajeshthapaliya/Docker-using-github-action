import React, { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from './ExpenseContext';
import './ExpenseList.css';

const ExpenseList = () => {
  const { expenses, removeExpense } = useContext(ExpenseContext);

  // // Function to group expenses by date
  const groupExpensesByDate = (expenses) => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
      const date = expense.date;
      if (groupedExpenses[date]) {
        groupedExpenses[date].push(expense);
      } else {
        groupedExpenses[date] = [expense];
      }
    });

    return groupedExpenses;
  };

  // Get expenses grouped by date
  const groupedExpenses = groupExpensesByDate(expenses);

  const [data,setData]=useState([])
  const getExpenses=async()=>{
    const response=await fetch('http://localhost:8080/expenses')
    const data=await response.json()
    console.log(data);
    setData(data.data)
  }
  useEffect(()=>{
    getExpenses()
  },[])

  return (
    <div className="expense-list">
      <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {/* {Object.keys(groupedExpenses).map((date) => ( */}
        {/* <div className="expense-group" key={date}>
          <h3 className="expense-date">{date}</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>${expense.amount}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeExpense(expense.id)}
                    >
                      Remove
                    </button>
                    <button className="edit-button">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      {/* ))} */}
    </div>
  );
};

export default ExpenseList;
