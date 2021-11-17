import { render, screen } from '@testing-library/react';
import { Context } from "../../../Context";
import NavBar from '../NavBar';

test('renders input box', () => {
    const isLoggedIn = false;

    render(
        <Context.Provider value={isLoggedIn}>
            <NavBar>Test text</NavBar>
        </Context.Provider>
    );

    const title = screen.getByText(/Frydge/i);
    expect(title).toBeInTheDocument();
});