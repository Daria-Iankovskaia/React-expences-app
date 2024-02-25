import React from "react";
import { render, screen } from '@testing-library/react';
import { Header } from "./Header";

test("renders header to the screen", () => {
    render(<Header />);
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toBe('Expense Tracker');
});