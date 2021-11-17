import styles from "./Item.module.css";


export default function Info(props) {
    return (
        <>
            <div id="name-margin" className={styles.info}>
                <h5 className={styles["item-name"]}> {props.name}</h5>
                <h5>Expiry: {props.expiry}</h5>
            </div>
        </>
    );
};
