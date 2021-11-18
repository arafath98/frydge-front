import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";

import InputBox from "../../components/UI/InputBox";
import Button from "../../components/UI/Button";
import { Context } from "../../Context";

import styles from "./Auth.module.css";

export default function Login() {

    document.title = "Login";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    const { theme, colors, isLoggedIn, setIsLoggedIn } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, []);

    const fields = [
        { name: "username", type: "text", placeholder: "Username..", setState: setUsername, value: username },
        { name: "password", type: "password", placeholder: "Password..", setState: setPassword, value: password },
    ];

    const inputChangeHandler = (e, setInput) => setInput(e.target.value);

    const getInputRows = (fields) => fields.map((field) => {
        return (
            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                    <InputBox
                        placeholder={field.placeholder}
                        type={field.type}
                        onChange={(e) => inputChangeHandler(e, field.setState)}
                        background={colors[theme].secondary}
                        backgroundFocused={colors[theme].secondaryHover}
                        color={colors[theme].text}
                    />
                </Col>
            </Row>
        );
    });

    const login = (e) => {
        e.preventDefault();

        const data = { username, password }

        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch("https://frydgeapp.herokuapp.com/users/login/", options)
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    window.localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                    navigate("/home");
                }

                setErrorMessages(["Invalid username or password"]);
            });
    }

    return (
        <>
            {
                isLoggedIn ? <></> :

                    <Container className={styles.container}>
                        <h1 style={{ color: colors[theme].text }}>Login</h1>

                        {errorMessages.length > 0 && errorMessages.map(error =>
                            <h3 style={{ color: "red" }}>{error}</h3>
                        )}

                        <form className={styles.form}>
                            {getInputRows(fields)}

                            <Row className="justify-content-center">
                                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                                    <Button className={styles.button} background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={login}>Login</Button>
                                </Col>
                            </Row>

                            <Row className="justify-content-center mt-2">
                                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                                    <div>
                                        <span>No account yet? </span>
                                        <a style={{ color: colors[theme].contrast, cursor: "pointer" }} onClick={() => navigate("/register")}>Register</a>
                                    </div>
                                </Col>
                            </Row>

                        </form>
                    </Container>
            }
        </>
    );
};
