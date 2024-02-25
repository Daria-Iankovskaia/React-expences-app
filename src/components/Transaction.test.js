import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Transaction } from './Transaction';
import { TransactionHistoryContext } from '../context/TransactionHistoryState';

describe('Transaction component', () => {
    test('renders deposit transaction', () => {
        const transaction = {
            id: 0,
            text: 'Salary',
            amount: 6000
        };

        const deleteTransaction = jest.fn();

        const result = render(
            <TransactionHistoryContext.Provider value={deleteTransaction}>
                <Transaction transaction={transaction} />
            </TransactionHistoryContext.Provider>
        );

        expect(result.container.getElementsByClassName('plus').length).toBe(1);
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('Salary');
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('+$6000');
        expect(result.container.getElementsByTagName('button')[0].innerHTML).toContain('Delete');
    });

    test('renders credit transaction', () => {
        const transaction = {
            id: 1,
            text: 'Tickets',
            amount: -200
        };

        const deleteTransaction = jest.fn();

        const result = render(
            <TransactionHistoryContext.Provider value={deleteTransaction}>
                <Transaction transaction={transaction} />
            </TransactionHistoryContext.Provider>
        );

        expect(result.container.getElementsByClassName('minus').length).toBe(1);
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('Tickets');
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('-$200');
        expect(result.container.getElementsByTagName('button')[0].innerHTML).toContain('Delete');
    });

    test('removes transaction if the delete button was clicked', () => {
        const transaction = {
            id: 0,
            text: 'Salary',
            amount: 6000
        };

        const deleteTransaction = jest.fn();

        const result = render(
            <TransactionHistoryContext.Provider value={{ deleteTransaction }}>
                <Transaction key={transaction.id} transaction={transaction} />
            </TransactionHistoryContext.Provider>
        );

        fireEvent.click(screen.getByText(/Delete/i));
        expect(deleteTransaction).toHaveBeenCalledTimes(1);
    });
});




