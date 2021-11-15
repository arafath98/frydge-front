import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./list.css"

export default function ShoppingList() {
    const [isFetched, setIsFetched] = useState(false)
    const [list, setList] = useState(['hamborger', 'lemons','grapes','bananas','beer'])
    
    const token = window.localStorage.getItem("token");
    
    let options = { 
        headers: {
            'Content-Type': 'application/json',
            "token": token,
            "origin": 'https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/'
        }
    }

    const getData = async () => {
       
        
        let results = await axios(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, options)
        console.log(results)

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
       
        

    }

    const handleChange = (e) => {
        
        console.log(e)
        e.target.previousSibling.classList.toggle('crossed')
    }

    
    return (
        <div>
            <p>Shopping List</p>
            <div id="list">
                <ul>
                    {list.map((item, index) =>( 
                    <div className="item-cont">
                    <li id="ab" key={index}>{item}</li>
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
            
        </div>
    )
}
