import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import { Context } from "../../Context";

import styles from "./Landing.module.css";

export default function Landing() {
    document.title = "Frydge";

    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    // useEffect(() => {
    //     isLoggedIn && navigate("/home")
    // }, [])

    return (
        <>
            {
                !isLoggedIn ? <> </> :
                    <Container>
                        <Row>
                            <Col className="jumbotron">

                            </Col>
                        </Row>

                        <div className="">
                            <div className={`display-1 ${styles.title}`}>Stop wasting food from today.</div>

                            <div className="display-4">Start tracking the expiry date of your favourite food.</div>
                        </div>
                    </Container>
            }
        </>
    );
};
