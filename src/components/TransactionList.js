import React, { useContext } from "react";
import { TransactionHistoryContext } from "../context/TransactionHistoryState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
    const { transactions } = useContext(TransactionHistoryContext);
    
    if (!transactions || !transactions.length) {
        return (
            <h3>NO TRANSACTIONS</h3>
        )
    };

    return (
        <>
            <h3>Transactions History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
    )
};