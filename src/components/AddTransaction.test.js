import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from "./AddTransaction";
import { TransactionHistoryContext } from '../context/TransactionHistoryState';

test('renders header, inputs, add transaction button to the screen', () => {
    const addTransaction = jest.fn();

    const result = render(
        <TransactionHistoryContext.Provider value={{ addTransaction }}
        >
            <AddTransaction />
        </TransactionHistoryContext.Provider>
    );

    //renders header
    expect(screen.getByRole('heading', { level: 3 }).innerHTML).toBe('Add new transaction');
    
    //renders TEXT label and TEXT input
    expect(result.container.getElementsByTagName('label')[0].innerHTML).toBe('Text');
    expect(result.container.getElementsByTagName('input')[0]).toBeInTheDocument();
    expect(result.container.getElementsByTagName('input')[0]).toHaveAttribute('type', 'text');
    const inputTextPlaceHolder = screen.getByPlaceholderText('Enter text');
    expect(inputTextPlaceHolder).toBeInTheDocument();

    //renders AMOUNT label and AMOUNT input
    expect(result.container.getElementsByTagName('label')[1].innerHTML).toBe('Amount');
    expect(result.container.getElementsByTagName('input')[1]).toBeInTheDocument();
    expect(result.container.getElementsByTagName('input')[1]).toHaveAttribute('type', 'number');
    const inputAmountPlaceHolder = screen.getByPlaceholderText('Enter amount');
    expect(inputAmountPlaceHolder).toBeInTheDocument();

    //renders Add transaction button
    expect(result.container.getElementsByTagName('button')[0].innerHTML).toContain('Add transaction');
});

test('Expected transaction is created when OnSubmit is clicked', () => {
    const addTransaction = jest.fn();

    render(
        <TransactionHistoryContext.Provider value={{ addTransaction }}>
            <AddTransaction />
        </TransactionHistoryContext.Provider>
    );

    const inputTextPlaceHolder = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputTextPlaceHolder, { target: { value: 'Salary' } });

    const inputAmountPlaceHolder = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(inputAmountPlaceHolder, { target: { value: '6000' } });

    fireEvent.click(screen.getByText(/Add Transaction/i));

    // Assert that addTransaction was called correctly
    expect(addTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
            id: expect.any(Number),
            text: 'Salary',
            amount: 6000
        })
    );
});

