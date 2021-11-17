import { render, screen } from '@testing-library/react';
import Nav from '../Nav';

test('renders input box', () => {
    render(<Nav>Test text</Nav>);

    const nav = screen.getByText(/Test text/i);
    expect(nav).toBeInTheDocument();
});