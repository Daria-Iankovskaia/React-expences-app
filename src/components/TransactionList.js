import React, { useContext } from "react";
import { TransactionHistoryContext } from "../context/TransactionHistoryState";
import { Transaction } from "./Transaction"

export const TransactionList = () => {
    const { transactions } = useContext(TransactionHistoryContext);
    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
            </ul>
        </>
    )
}