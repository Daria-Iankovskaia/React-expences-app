import React from 'react';
import { render } from '@testing-library/react';
import { IncomeExpences } from './IncomeExpences';
import { TransactionHistoryContext } from '../context/TransactionHistoryState';

describe('IncomeExpences component', () => {
    test('renders headers and empty states', () => {
        const result = render(<IncomeExpences />)

        expect(result.container.getElementsByTagName('h4')[0].innerHTML).toBe('Income')
        expect(result.container.getElementsByTagName('h4')[1].innerHTML).toBe('Expense')

        expect(result.container.getElementsByClassName('plus')[0].innerHTML).toBe('0.00');
        expect(result.container.getElementsByClassName('minus')[0].innerHTML).toBe('0.00');
    });

    test('displays expected income and expense amount for given transactions', () => {
        const transactions = [
            {
                id: 0,
                text: 'transaction 0',
                amount: 78
            },
            {
                id: 1,
                text: 'transaction 1',
                amount: -200
            },
            {
                id: 2,
                text: 'transaction 2',
                amount: 6000
            },
            {
                id: 3,
                text: 'transaction 3',
                amount: -400
            }
        ];

        const result = render(
            <TransactionHistoryContext.Provider value={{
                transactions: transactions
            }}>
                <IncomeExpences />
            </TransactionHistoryContext.Provider>
        )

        expect(result.container.getElementsByClassName('plus')[0].innerHTML).toBe('6078.00');
        expect(result.container.getElementsByClassName('minus')[0].innerHTML).toBe('-600.00');
    });
});