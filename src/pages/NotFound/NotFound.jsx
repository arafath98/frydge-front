import { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from "../../Context";
import { useNavigate } from "react-router";

import Button from "../../components/UI/Button";

import Logo from "./not-found2.svg";
import styles from "./styles.module.css";

export default function NotFound() {
    document.title = "Not Found";

    const { theme, colors } = useContext(Context)
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    return (
        <Container className="py-2">
            <Row className="justify-content-center">
                <Col xs={12} sm={11} md={8} lg={6} xl={5}>
                    <img className={styles.logo} src={Logo} alt="404" />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={5} sm={11} md={8} lg={6} xl={2}>
                    <Button
                        background={colors[theme].contrast}
                        color={colors[theme].contrastTextColor}
                        className={styles.button}
                        onClick={goBack}
                    >Go to Home</Button>
                </Col>
            </Row>
        </Container>
    );
};