import { useState, useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import { Context } from "../../Context";

export default function AddEmail(props) {

    const { theme, colors } = useContext(Context);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email) => {
        // PATTERN FROM STACKOVERFLOW
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return email.match(pattern);
    }

    const emailChangeHandler = (e) => {
        setIsValidEmail(true);
        setEmail(e.target.value);
    };

    const sendEmail = () => {
        if (validateEmail(email)) {
            props.addEmail(email);
            return;
        }

        setIsValidEmail(false);
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                    {!isValidEmail && <center><h3 style={{ color: "red" }}>Not a valid email</h3></center>}
                    <InputBox
                        placeholder="Email.."
                        type="text"
                        onChange={emailChangeHandler}
                        background={colors[theme].secondary}
                        backgroundFocused={colors[theme].secondaryHover}
                        color={colors[theme].text}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                    <Button background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={sendEmail}>Add Email</Button>
                </Col>
            </Row>
        </Container>
    );
};
