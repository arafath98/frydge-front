import { useState, useContext } from "react";
import { Alert, Snackbar } from "@mui/material"
import { Container, Row, Col } from "react-bootstrap";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import { Context } from "../../Context";

export default function AddEmail(props) {

    const { theme, colors } = useContext(Context);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [message, setmessage] = useState("")
    const [open, setOpen] = useState(false)
    const [messageType, setMessageType] = useState("")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

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
            const data = { email: email }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': window.localStorage.getItem('token')
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }
            fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/email/", options)
                .then(resp => resp.json())
                .then(data => {
                    setOpen(true)
                    setmessage(data.message)
                    if (data.message == "This email already exists.") {
                        setMessageType("error")
                    }
                    else {
                        setMessageType("success")
                    }
                })
                .catch(err => {
                    return err
                })
            return;
        }

        setIsValidEmail(false);
    }

    const delEmail = () => {
        if (validateEmail(email)) {
            const data = { email: email }
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': window.localStorage.getItem('token')
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }
            fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/email/", options)
                .then(resp => resp.json())
                .then(data => {
                    setOpen(true)
                    setmessage(data.message)
                    if (data.message == "Could not find email you were looking for.") {
                        setMessageType("error")
                    }
                    else {
                        setMessageType("success")
                    }

                })
                .catch(err => {
                    return err
                })
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
                    <Button background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={sendEmail}>Add Email for notification</Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-2">
                <Col xs={10} sm={10} md={8} lg={7} xl={6}>
                    <Button background={colors[theme].contrast} color={colors[theme].contrastTextColor} onClick={delEmail}>Delete Email</Button>
                </Col>
            </Row>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert aria-label="popup" onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};
