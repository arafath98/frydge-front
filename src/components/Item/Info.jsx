import styles from "./Item.module.css";

export default function Info(props) {
    return (
        <>
            <div className={styles.info}>
                <h5>No: {props.barcode}</h5>
                <h3>Expiry: {props.expiry}</h3>
            </div>
        </>
    );
};
