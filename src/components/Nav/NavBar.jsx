import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Context } from "../../Context";

import Nav from "./Nav";

import styles from "./Nav.module.css";

export default function NavBar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);

    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <Nav>
            <Container className={styles.container}>
                <div className={styles.title}>Frydge</div>

                <div className={styles.links}>
                    {
                        isLoggedIn == false && <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    }

                    {
                        isLoggedIn && <Link to="/" onClick={logOut}>Logout</Link>
                    }
                </div>
            </Container>
        </Nav>
    );
};
