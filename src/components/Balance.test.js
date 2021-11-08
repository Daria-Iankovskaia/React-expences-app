import React from 'react';
import { render, screen } from '@testing-library/react';
import { Balance } from "./Balance";
import { TransactionHistoryContext } from '../context/TransactionHistoryState';

test('it renders empty state', () => {
  render(<Balance/>)
  expect(screen.getByRole('heading', { level: 4 }).innerHTML).toBe('Your balance');
  expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('$0.00');
});

test('it displays expected balance for given transactions', () => {
    const transactions = [
        {
            id: 0,
            text: 'transaction 0',
            amount: 50.30
        },
        {
            id: 1,
            text: 'transaction 1',
            amount: -10.40
        },
        {
            id: 2,
            text: 'transaction 2',
            amount: 1.35
        }
    ];
    render(
        <TransactionHistoryContext.Provider value={{
            transactions: transactions
        }}>
            <Balance/>
        </TransactionHistoryContext.Provider>
    )
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('$41.25');
  });