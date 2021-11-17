import { render, screen } from '@testing-library/react';
import NavigationBar from '../NavigationBar';

test('renders input box', () => {
    render(<NavigationBar />);

    const nav = screen.getByText(/Register/i);
    expect(nav).toBeInTheDocument();
});