import { useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { Context } from "../../Context";
import Delete from "../UI/Delete";
import RoundedContainer from "../UI/RoundedContainer";

import Image from "./Image";
import Info from "./Info";

import styles from "./Item.module.css";

export default function Item(props) {

    const { theme, colors, setItemsData } = useContext(Context);

    const deleteItemHandler = (id) => {
        console.log("Clicked element with id " + id);
        setItemsData((previousData) => {
            return previousData.filter(data => data.id !== id);
        });
    };

    return (
        <RoundedContainer background={colors[theme].secondary}>
            <Row className="justify-content-center">
                <Col xs={4}>
                    <h3>{props.name}</h3>
                    <Image src={props.image} />
                </Col>

                <Col xs={8}
                    className={styles.details}>
                    <Info
                        barcode={props.barcode}
                        expiry={props.expiry}
                    />

                    <Delete onClick={() => deleteItemHandler(props.id)} />
                </Col>
            </Row>
        </RoundedContainer>
    );
};
