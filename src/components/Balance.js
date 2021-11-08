import React, { useContext } from "react"
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

export const Balance = () => {

    const { transactions } = useContext(TransactionHistoryContext);
    debugger;
    const total = transactions
    .map(transaction => transaction.amount)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    return (
        <>
            <h4>Your balance</h4>
            <h1>${total}</h1>
        </>
    )
}