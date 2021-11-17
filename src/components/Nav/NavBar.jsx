import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { Context } from "../../Context";

import Nav from "./Nav";
import Darkmode from "../../pages/Home/Darkmode";
import styles from "./Nav.module.css";

export default function NavBar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);

    const navigate = useNavigate();

    // const logout = (e) => {
    //     e.preventDefault();
    //     window.localStorage.removeItem("token");
    //     setIsLoggedIn(false);
    //     navigate("/");
    // }

    return (
        <Nav>
            <Container className={styles.container}>
                <img style={{height:'50px'}} src="./smart.png" alt="" />
                <div className={styles.title}>Frydge</div>

                <div className={styles.links}>
                    {
                        isLoggedIn === false && <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    } 
{/* 
                    {isLoggedIn && <Darkmode/>
                    
          
        
          } */}

                    {/* {
                        isLoggedIn && <>
                            <Link to="/home">Home</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </>
                    } */}
                </div>
            </Container>
        </Nav>
    );
};
