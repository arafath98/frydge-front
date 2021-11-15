import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getItemsFromApi } from "../../api/ItemsData";
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
                setItemsData(data.data.map((item) => {
                    const date = item["expiry"].split("-")
                    // console.log(date)
                    const date1 = new Date(`${date[1]}/${date[2]}/${date[0]}`)
                    const date2 = new Date()
                    const diffTime = date1 - date2;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    console.log(diffDays)
                    item.expiry = diffDays
                    return item
                }));
                setUsername(data.username);
                console.log(itemsData)
                // items expiring within 5 day
                console.log(Math.abs(Date.now() - itemsData[0]["expiry"]))
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
