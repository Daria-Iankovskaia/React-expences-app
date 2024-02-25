import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";

const addTransactions = (transactions) => {
    const textInputElement = screen.getByPlaceholderText(/Enter text/i);
    const amountInputElement = screen.getByLabelText("Amount");
    const buttonElement = screen.getByRole('button', { name: /Add transaction/i });

    transactions.forEach(transaction => {
        fireEvent.change(textInputElement, { target: { value: transaction.text } });
        fireEvent.change(amountInputElement, { target: { value: transaction.amount } });
        fireEvent.click(buttonElement);
    })
};

describe("App", () => {
    test('user can add transactions', () => {
        const result = render(<App />);

        addTransactions([
            {
                text: "Salary",
                amount: 6000.00
            },
            {
                text: "Tickets",
                amount: -200.00
            }
        ]);

        //Balance to be:
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('$5800.00');

        //Income in IncomeExpense to be:
        const elementIncome = result.container.getElementsByClassName('plus')[0];
        const elementExpense = result.container.getElementsByClassName('minus')[0];

        expect(elementIncome.innerHTML).toBe("6000.00");
        expect(elementExpense.innerHTML).toBe("-200.00");

        //Transaction is added to the list of transactions

        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('Tickets');
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('-$200');

        expect(result.container.getElementsByTagName('li')[1].innerHTML).toContain('Salary');
        expect(result.container.getElementsByTagName('li')[1].innerHTML).toContain('+$6000');
    });
    
    test('user can add transactions and delete it', () => {
        const transactions = [
            {
                text: "Salary",
                amount: 6000.00
            },
            {
                text: 'Tickets',
                amount: -200
            }
        ];

        const result = render(<App />)

        addTransactions(transactions);

        const buttonElement = screen.getAllByRole('button', { name: /Delete/i })[0];
        fireEvent.click(buttonElement);

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('$6000.00');

        const elementIncome = result.container.getElementsByClassName('plus')[0];
        const elementExpense = result.container.getElementsByClassName('minus')[0];

        expect(elementIncome.innerHTML).toBe("6000.00");
        expect(elementExpense.innerHTML).toBe("0.00");

        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('Salary');
        expect(result.container.getElementsByTagName('li')[0].innerHTML).toContain('+$6000');
    });
});

