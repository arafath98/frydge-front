import { useContext, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/UI/Button";

import InputBox from "../../components/UI/InputBox";
import { Context } from "../../Context";

import styles from "./Register.module.css";


export default function Register() {

    document.title = "Register";

    const { theme, colors } = useContext(Context);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fields = [
        { name: "username", type: "text", placeholder: "Username..", setState: setUsername, value: username },
        { name: "email", type: "text", placeholder: "Email..", setState: setEmail, value: email },
        { name: "password", type: "password", placeholder: "Password..", setState: setPassword, value: password },
        { name: "confirm-password", type: "password", placeholder: "Confirm password..", setState: setConfirmPassword, value: confirmPassword },
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
            erros.map(field => console.log(field))
            return;
        }

        console.log("REGISTRATION");
    };

    return (
        <Container className={styles.container}>
            <h1 style={{ color: colors[theme].text }}>Register</h1>

            <form className={styles.form}>
                {getInputRows(fields)}

                <Row className="justify-content-center">
                    <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                        <Button className={styles.button} background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={register}>Register</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};