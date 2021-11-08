import React, { useContext } from "react";
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(TransactionHistoryContext)
    const sign = transaction.amount < 0 ? "-" : "+";

    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} 
            
            <span>{sign}${Math.abs(transaction.amount)}</span>
            
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
                x
            </button>
        </li>
    )
}
//Math.abs is a method that return the absolute value of a number
//Math.abs(-2) => 2
//We use it to avoid getting -$-200