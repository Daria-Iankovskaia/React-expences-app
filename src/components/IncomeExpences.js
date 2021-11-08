import React, { useContext } from 'react';
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

export const IncomeExpences = () => {
    const { transactions } = useContext(TransactionHistoryContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

        // https://zellwk.com/blog/reduce/
        // 1. filter the array with all the amounts and return an array with positive amounts.
        // reduce is an array method that helps you convert an array into a single value.
        // 2. acc - accumulator - is the value returned from the previous
        // iteration. It will be initialValue for the first iteration (0).
        // the 1st iteration will be 0 + the first amount in the array,
        // the 2ns iteration will be the result from the first iteration + the second number
        // in the array
        // toFixed(2) - the method formats a number using fixed-point notation.
        //so it will return 2 numbers after the dot in our case.
        
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{expense}</p>
            </div>
        </div>
    )
}