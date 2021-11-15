import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./list.css"

export default function ShoppingList() {
    const [isFetched, setIsFetched] = useState(false)
    const [list, setList] = useState([])

    
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
        let results = await axios(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`,  options)
        let data = results.data.data
        let shoppingList = []
        for (let item in data) {
            shoppingList.push(data[item].listItem)
        }
        setList(shoppingList)

    }
    useEffect(async ()=> {
        await getData()
        setIsFetched(true)
    }, [])

    const handleSubmit = (e) => {
       
        console.log(e)
        console.log(document.getElementById('item-input').value)
        let newElement = document.getElementById('item-input').value
        let form = document.getElementById('form')
        e.preventDefault()
        setList(prev => [...prev, newElement])
        form.reset()

        let body = {
            "item": newElement
        }

        axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, body, options)
       
        

    }

    const handleChange = (e) => {
        
        console.log(e)
        e.target.previousSibling.classList.toggle('crossed')
    }

    const handleClear = (e) => {
        
        for (let things in list) {
            if (document.getElementById(things).classList.contains('crossed')){
                let selected = document.getElementById(things)
                
                let deleteOptions = {
                    headers: {
                        "HTTP_TOKEN": token,
                        'Content-Type': 'application/json'
                    }

                }
                
                let deleteBody = {
                    "item" : selected
                }
                axios.delete(`http://localhost:8000/users/delete/`, deleteBody,  deleteOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
               
               
            }
        }
       
    }

    
    return (
        <div>
            <p>Shopping List</p>
            <div id="list">
                <ul>
                    {list.map((item, index) =>( 
                    <div className="item-cont">
                    <li id={index} key={index}>{item}</li>
                    <input id="checkbox" type="checkbox" onChange={handleChange}></input>
                    </div>))}
                </ul>
            </div>
            <div id ="add-item">
                <form id="form" onSubmit={handleSubmit}>
                <input id="item-input" type="text" placeholder="Enter Item to add"></input>
                <button type="submit" >Add</button>
                </form>
            </div>
            <button onClick={handleClear}>CLEAR SHOPPING LIST</button>
            
        </div>
    )
}
