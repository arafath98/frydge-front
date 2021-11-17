import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Item from "../../components/Item/Item";
import { Context } from "../../Context";
import Modal1 from "./Modal1";


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

    const getExpiryDays = (expiry) => {
        if (expiry === 0)
            return "Expired today!"

        if (expiry <= -1) {
            if (expiry === -1)
                return "Expired 1 day ago!"

            return `Expired ${Math.abs(expiry)} days ago!`
        }

        if (expiry === 1)
            return "In 1 day"

        return `In ${Math.abs(expiry)} days`
    }


    const getItems = () => {

        itemsData.sort((a, b) => {
            let check1 = a.expiry
            let check2 = b.expiry
            if (check1 < check2) return -1
            if (check1 > check2) return 1
            return 0
        })

        if (!itemsData.length > 0)
            return <center style={{ color: 'red' }}><h3>NO ITEMS</h3></center>

        return itemsData.map((item) => <><Item
            key={item.id}
            id={item.id}
            name={item.name}
            expiry={getExpiryDays(item.expiry)}
            barcode={item.barcode}
            image={item.image}
        />
            <hr />
        </>
        )
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
