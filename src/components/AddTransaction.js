import React, { useState, useContext } from "react";
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(TransactionHistoryContext);

    const onSubmit = e => {
        e.preventDefault();

        if (!text || !amount || isNaN(amount)) {
            alert('Please enter a valid text and amount.');
            return;
        };

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: parseFloat(amount)
        };
        addTransaction(newTransaction); 
        setText('');
        setAmount('');
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        id="text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Enter text'
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='Enter amount'
                    />
                </div>
                <button className="btn" onClick={onSubmit}>Add transaction</button>
            </form>
        </>
    )
};