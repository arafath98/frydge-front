import { render, screen } from '@testing-library/react';
import Delete from '../Delete';

test('renders delete icon', () => {
    render(<Delete />);

    const deleteIcon = screen.getByTestId("delete");
    expect(deleteIcon).toBeInTheDocument();
});