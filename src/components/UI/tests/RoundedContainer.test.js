import { render, screen } from '@testing-library/react';
import Container from '../RoundedContainer';

test('renders input box', () => {
    render(<Container>Test Container</Container>);

    const container = screen.getByText(/Test Container/i);
    expect(container).toBeInTheDocument();
});