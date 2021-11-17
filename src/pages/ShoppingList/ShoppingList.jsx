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
import { Alert, Snackbar } from "@mui/material"



export default function ShoppingList() {
    const { theme, colors, setTheme } = useContext(Context);
    const [isFetched, setIsFetched] = useState(false)
    const [list, setList] = useState([])
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false)
    const [message, setmessage] = useState("")
    const [messageType, setMessageType] = useState("")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const handleCloseModal = () => setShow(false);
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

        
        let results = await axios(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, options)
        let data = results.data.data
        let shoppingList = []
        for (let item in data) {

            shoppingList.push(data[item])
        }
       
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
       
        let type = document.getElementById('type').value
        let form = document.getElementById('form')


        
        let body = {
            "item": newElement,
            "quantity": quantity,
            "type": type
        }

        axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, body, options)

            .then(response => {
                
                setList(prev => [...prev, response.data.item])
                form.reset()
                setOpen(true)
                setMessageType("success")
                setmessage("Item added!")
            })
            
        
       





    }
  

    let deleteOptions = {

        headers: {
            "token": token,
            'Content-Type': 'application/json',

        }

        }
    


    const handleClear = (e) => {
        for (let things in list) {
            console.log(document.getElementById(list[things].id))

            if (document.getElementById(list[things].id).checked) {
                console.log("wagwan")
                let selected = list[things].id
                let deleteBody = {
                    "id": selected,
                }

                axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/delete/`, deleteBody, deleteOptions)
                    .catch(error => console.log(error))
                getData()
                getData()
               
               

            }
        }

        document.querySelectorAll('input[type=checkbox').forEach(el => el.checked = false)
        setOpen(true)
                setMessageType("success")
                setmessage("Item(s) cleared!")

    }


    return (
        <div id="container">
            <h3 id="#h3">Shopping List</h3>
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
                    <Button variant="secondary" onClick={handleCloseModal}>
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
                                <img id ="icon" src={item.type == 'meat' ? meat : item.type == 'produce' ? veg : item.type == "dairy" ? dairy : item.type == "seafood" ? fish : item.type == "other" ? misc : null} />
                                <li  key={item.id} >{item.listItem} </li>
                                <p>{item.quantity}</p>
                                <input id={item.id} type="checkbox"  ></input>
                            </div>
                            <hr id="hr" />
                        </>
                    ))}
                </ul>
            </div>
            <Snackbar anchorOrigin={{ vertical: 'center', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert aria-label="popup" onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

           
        </div>
    )
}
