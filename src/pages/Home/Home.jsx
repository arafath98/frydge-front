import { useContext } from "react";
import { Container } from "react-bootstrap";

import Item from "../../components/Item/Item";
import { Context } from "../../Context";

export default function Home() {
    document.title = 'Home';

    const { itemsData } = useContext(Context);

    const getItems = () => {
        if (!itemsData.length > 0)
            return <center style={{ color: 'red' }}><h3>NO ITEMS</h3></center>

        return itemsData.map((item) => <Item
            key={item.id}
            id={item.id}
            name={item.name}
            expiry={item.expiry}
            barcode={item.barcode}
            image={item.image}
        />)
    }

    return (
        <Container>
            {getItems()}
        </Container>
    );
};
