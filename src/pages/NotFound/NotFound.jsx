import { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Contex } from "../../Contex";
import { useNavigate } from "react-router";

import Button from "../../components/UI/Button";

import Logo from "./not-found2.svg";
import styles from "./styles.module.css";

export default function NotFound() {
    const { theme, colours } = useContext(Contex)
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    console.log(colours[theme].contrast);
    return (
        <Container className="mt-2">
            <Row className="justify-content-center">
                <Col xs={12} sm={11} md={8} lg={6} xl={5}>
                    <img className={styles.logo} src={Logo} alt="404" />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={5} sm={11} md={8} lg={6} xl={2}>
                    <Button
                        bg={colours[theme].contrast}
                        textColor={colours[theme].contrastTextColor}
                        className={styles.button}
                        onClick={goBack}
                    >Go to Home</Button>
                </Col>
            </Row>
        </Container>
    );
};