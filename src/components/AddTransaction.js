import React, { useState, useContext } from "react";
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(TransactionHistoryContext);

    const onSubmit = e => {
        debugger;
        e.preventDefault();
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: parseFloat(amount)
        }
        addTransaction(newTransaction)
    }

    /*
        Math.random generates a number between 0 and 1, that isn’t a whole number, and also isn’t 1. To get a number, for example between 0 and 10, multiply your answer by 10: Math.random() * 10 To get it to be a whole number, i.e. an integer, apply Math.floor, which rounds down to the nearest whole number: Math.floor(Math.random() * 10) To get a whole number between 1 and 10, add 1 to the answer: Math.floor(Math.random() * 10 + 1)  
        
    */
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                    />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

