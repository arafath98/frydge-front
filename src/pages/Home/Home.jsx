import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Item from "../../components/Item/Item";
import { Context } from "../../Context";

export default function Home() {
    document.title = 'Home';

    const navigate = useNavigate();

    const { itemsData, isLoggedIn, setItemsData, setUsername } = useContext(Context);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }

        const token = window.localStorage.getItem("token");

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "token": token,
            }
        }

        console.log("Now fetching data...");

        fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/", options)
            .then(response => response.json())
            .then(data => {
                setItemsData(data.data);
                setUsername(data.username);
            })
            .catch(err => err)
    }, []);

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
        <>
            {
                isLoggedIn && <Container>
                    {getItems()}
                </Container>
            }
        </>

    );
};
