import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import "./list.css"
import { Context } from "../../Context";
import meat from "../../images/meat.png"
import veg from "../../images/veg.png"
import dairy from "../../images/dairy.png"
import misc from "../../images/misc.png"
import fish from "../../images/fish.png"
import { Modal, Button } from 'react-bootstrap';



export default function ShoppingList() {
    const { theme, colors, setTheme } = useContext(Context);
    const [isFetched, setIsFetched] = useState(false)
    const [list, setList] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const token = window.localStorage.getItem("token");

    let options = {
        headers: {
            'Content-Type': 'application/json',
            "token": token,
            // "origin": 'https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/'
        }


    }



    const getData = async () => {

        console.log(token)
        let results = await axios(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, options)
        let data = results.data.data
        console.log(data)
        let shoppingList = []
        for (let item in data) {

            shoppingList.push(data[item])
        }
        console.log(shoppingList)
        setList(shoppingList)

    }
    useEffect(async () => {
        await getData()
        setIsFetched(true)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let newElement = document.getElementById('item-input').value

        let quantity = document.getElementById('quantity').value
        console.log(quantity)
        let type = document.getElementById('type').value
        let form = document.getElementById('form')


        console.log(type)
        let body = {
            "item": newElement,
            "quantity": quantity,
            "type": type
        }

        axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, body, options)

            .then(response => {
                console.log('test ?')
                setList(prev => [...prev, response.data.item])
                form.reset()

            })




    }
    // const handleChange = (e) => {

    //     console.log(e)
    //     if (e.target.checked) {
    //         e.target.previousSibling.classList.add('crossed')
    //     } else if (!e.target.checked) {
    //         e.target.previousSibling.classList.remove('crossed')
    //     }
    // }


    // const handleChangeIt = (e) => {
    //     if (!e.target.classList.contains('crossed')) {
    //         e.target.classList.add('crossed')
    //         e.target.nextSibling.checked = true
    //     } else if (e.target.classList.contains('crossed')) {
    //         e.target.classList.remove('crossed')
    //         e.target.nextSibling.checked = false
    //     }
    // }

    let deleteOptions = {

        headers: {
            "token": token,
            'Content-Type': 'application/json',

        }

    }


    const handleClear = (e) => {
        console.log("clicked")
        for (let things in list) {
            if (document.getElementById(list[things].id).checked) {
                let selected = list[things].id
                let deleteBody = {
                    "id": selected,
                }

                axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/delete/`, deleteBody, deleteOptions)
                    .catch(error => console.log(error))
                getData()
                getData()
               
                document.querySelectorAll('input[type=checkbox').forEach(el => el.checked = false)

            }
        }



    }


    return (
        <div id="container">
            <h3>Shopping List</h3>
            <div id="addNclear">
            <Button id="add-new" onClick={handleShow}>
                Add New Item
            </Button>
            <Button id="clear" onClick={handleClear}>Clear Items</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an item to shopping list</Modal.Title>
                </Modal.Header>
                <Modal.Body><div id="add-item">
                <form id="form" onSubmit={handleSubmit}>
                    <label for="item-input">Name of Item</label>
                    <input id="item-input" type="text" placeholder="Enter Item to add"></input>
                    <label for="quantity">How many? </label>
                    <input id="quantity" type="text" placeholder="Enter Number of Items"/>
                    <label for="type">Type of item</label>
                    <select name="type" id="type">
                        <option value="meat">Meat</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="seafood">Seafood</option>
                        <option value="other">Misc</option>

                    </select>
                    
                    <button id="add-btn" type="submit">Add</button>
                </form>
            </div>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <div id="list">
                {/* <ul style={{"background-color":colors[theme].secondary }}> */}
                <ul>
                    {list.map((item,) => (
                        <>
                            <div className="item-cont">
                                <img src={item.type == 'meat' ? meat : item.type == 'produce' ? veg : item.type == "dairy" ? dairy : item.type == "seafood" ? fish : item.type == "other" ? misc : null} />
                                <li  key={item.id} >{item.listItem} </li>
                                <p>{item.quantity}</p>
                                <input id={item.id} type="checkbox"  ></input>
                            </div>
                            <hr id="break" />
                        </>
                    ))}
                </ul>
            </div>

           
        </div>
    )
}
