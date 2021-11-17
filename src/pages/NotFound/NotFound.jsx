import { useContext } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from "../../Context";
import { useNavigate } from "react-router";

import Button from "../../components/UI/Button";

import logo from "./not-found2.svg";
import logo2 from "./not-found.svg";
import styles from "./styles.module.css";

export default function NotFound() {
    document.title = "Not Found";

    const { theme, colors } = useContext(Context)
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    return (
        <Container className="">
            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={7} lg={5} xl={4}>
                    <img className={styles.logo} src={theme == "dark" ? logo2 : logo} alt="404" />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={10} sm={10} md={7} lg={5} xl={4}>
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