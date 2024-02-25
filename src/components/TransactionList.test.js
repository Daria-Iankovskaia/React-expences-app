import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionList } from './TransactionList';
import { TransactionHistoryContext } from "../context/TransactionHistoryState";

describe('TransactionList component', () => {
    test('Renders "NO TRANSACTIONS" when there are no transactions', () => {
        const transactions = [];
        
        render(
            <TransactionHistoryContext.Provider value={{ transactions }}>
                <TransactionList />
            </TransactionHistoryContext.Provider>
        );

        expect(screen.getByRole('heading', { level: 3 }).innerHTML).toBe('NO TRANSACTIONS');
    });

    test('renders header and transactions for given transactions', () => {
        const transactions = [
            {
                id: 0,
                text: 'Salary',
                amount: 600
            },
            {
                id: 1,
                text: 'Tickets',
                amount: 200
            }
        ];

        const result = render(
            <TransactionHistoryContext.Provider value={{ transactions }}>
                <TransactionList />
            </TransactionHistoryContext.Provider>
        );

        expect(screen.getByRole('heading', { level: 3 }).innerHTML).toBe('Transactions History');
        expect(result.container.getElementsByTagName('li').length).toBe(2)
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('Salary')
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('600')
        expect(result.container.getElementsByTagName('li')[1].innerHTML).toContain('Tickets')
        expect(result.container.getElementsByTagName('li')[1].innerHTML).toContain('200')
    });
});

