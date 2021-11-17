import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button', () => {
    render(<Button>Try</Button>);

    const button = screen.getByText(/Try/i);
    expect(button).toBeInTheDocument();
});