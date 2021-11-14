export default function Expiry(props) {
    const formatDate = (date) => {
        return date;
    };

    return (

        <h3>Expiry: {formatDate(props.expiry)}</h3>
    );
};
