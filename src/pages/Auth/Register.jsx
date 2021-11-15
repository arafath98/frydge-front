import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/UI/Button";

import InputBox from "../../components/UI/InputBox";
import { Context } from "../../Context";

import styles from "./Auth.module.css";


export default function Register() {

    document.title = "Register";

    const { theme, colors, isLoggedIn } = useContext(Context);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const navigate = useNavigate();

    // useEffect(() => {
        
    //     if (isLoggedIn)
    //         navigate("/");
    // }, []);

    const fields = [
        { name: "username", type: "text", placeholder: "Username..", setState: setUsername },
        { name: "email", type: "text", placeholder: "Email..", setState: setEmail },
        { name: "password", type: "password", placeholder: "Password..", setState: setPassword },
        { name: "confirm-password", type: "password", placeholder: "Confirm password..", setState: setConfirmPassword },
    ];

    // This function receives the setState function retuned from the useState to update the current state of the input field
    const inputChangeHandler = (e, setInput) => setInput(e.target.value);

    // Returns an input element for each of the fields
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

    const validateEmail = (email) => {
        // PATTERN FROM STACKOVERFLOW
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return email.match(pattern);
    }

    const validateFields = () => {
        const errors = [];

        if (username.trim().length < 4)
            errors.push("Username too short");

        if (!validateEmail(email))
            errors.push("Email not valid");

        if (password.length <= 5)
            errors.push("Password too short");

        if (password !== confirmPassword)
            errors.push("Password does not match");

        return errors;
    };

    const register = (e) => {
        e.preventDefault();

        const erros = validateFields();
        if (erros.length > 0) {
            setErrorMessages(erros);
            return;
        }

        const data = {
            username: username,
            email: email,
            password: password
        }

        const options = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(data)
        };

        fetch("http://127.0.0.1:8000/users/register/", options)
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    navigate("/login");
                }
            });
    };

    return (
        <>
            {
                // isLoggedIn ? <></> :

                    <Container className={styles.container}>
                        <h1 style={{ color: colors[theme].text }}>Register</h1>

                        {errorMessages.length > 0 && errorMessages.map(error =>
                            <h3 style={{ color: "red" }}>{error}</h3>
                        )}

                        <form className={styles.form}>
                            {getInputRows(fields)}

                            <Row className="justify-content-center">
                                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                                    <Button className={styles.button} background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={register}>Register</Button>
                                </Col>
                            </Row>
                        </form>
                    </Container>
            }
        </>
    );
};