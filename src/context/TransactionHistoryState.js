import React, { createContext, useReducer } from 'react';
import AppReducer from "./AppReducer";

const initialState = {
    transactions: []
};

export const TransactionHistoryContext = createContext(initialState);

export const TransactionHistoryProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function deleteTransaction(id) {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: id
        })
    };

    function addTransaction(transaction) {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        })
    };

    return (
        <TransactionHistoryContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </TransactionHistoryContext.Provider>
    )
};

