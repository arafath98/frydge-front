import { render, screen } from '@testing-library/react';
import InputBox from '../InputBox';

test('renders input box', () => {
    render(<InputBox placeholder="test.." />);

    const input = screen.getByPlaceholderText("test..");
    expect(input).toBeInTheDocument();
});