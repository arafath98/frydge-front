import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../../components/Item/Item";
import InputBox from "../../components/UI/InputBox";
import { Context } from "../../Context";

export default function Home() {
    document.title = 'Home';

    const navigate = useNavigate();

    const { itemsData, isLoggedIn, setItemsData, setUsername, theme, colors } = useContext(Context);

    const [searchInput, setSearchInput] = useState("");
    const [filteredItems, setFilteredItems] = useState(itemsData);

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

        fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/", options)
            .then(response => response.json())
            .then(data => {
                setItemsData(data.data.map((item) => {
                    const date = item["expiry"].split("-")
                    const date1 = new Date(`${date[1]}/${date[2]}/${date[0]}`)
                    const date2 = new Date()
                    const diffTime = date1 - date2;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    item.expiry = diffDays
                    return item
                }));
                setUsername(data.username);
                // items expiring within 5 day
            })
            .catch(err => err)
    }, []);

    useEffect(() => {
        const f = itemsData.filter(item => item.name.toLowerCase().includes(searchInput) ? true : false)
        setFilteredItems(f);
    }, [searchInput])

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

        filteredItems.sort((a, b) => {
            let check1 = a.expiry
            let check2 = b.expiry
            if (check1 < check2) return -1
            if (check1 > check2) return 1
            return 0
        })

        if (!filteredItems.length > 0)
            return <center style={{ color: 'red' }}><h3>NO ITEMS</h3></center>

        return filteredItems.map((item) => <><Item
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

    const filter = (e) => {
        setSearchInput(e.target.value.toLowerCase());
    };

    return (
        <>

            {
                isLoggedIn &&
                <Container>
                    <Row>
                        <Col>
                            <InputBox
                                placeholder="Search.."
                                type="text"
                                onChange={filter}
                                background={colors[theme].secondary}
                                backgroundFocused={colors[theme].secondaryHover}
                                color={colors[theme].text}
                            />
                        </Col>
                    </Row>

                    {getItems()}
                </Container>
            }
        </>

    );
};
