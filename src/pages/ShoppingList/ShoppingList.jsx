import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import "./list.css"
import Footer from '../../components/footer/Footer'
import { Context } from "../../Context";


export default function ShoppingList() {
    const {theme, colors, setTheme  } = useContext(Context);
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
        console.log(data)
        let shoppingList = []
        for (let item in data) {
            
            shoppingList.push(data[item])
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
        

        let body = {
            "item": newElement
        }

        axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/list/`, body, options)
        
        .then(response => { console.log('test ?') 
        setList(prev => [...prev, response.data.item])
        form.reset()
        
    })

       
      

    }
    const handleChange = (e) => {

        console.log(e)
        if(e.target.checked) {
        e.target.previousSibling.classList.add('crossed')
        } else if (!e.target.checked) {
            e.target.previousSibling.classList.remove('crossed')
        }
    }
  
   
    const handleChangeIt = (e) => {
        if (!e.target.classList.contains('crossed')) {
            e.target.classList.add('crossed')
            e.target.nextSibling.checked = true 
        } else if (e.target.classList.contains('crossed')) {
            e.target.classList.remove('crossed')
            e.target.nextSibling.checked = false
        }
    }

    let deleteOptions = {
        
        headers: {
            "token":  token,
            'Content-Type': 'application/json',
           
        }

    }
    
    
    const handleClear = (e) => {
        
        for (let things in list) {
            if (document.getElementById(list[things].id).classList.contains('crossed')){
                let selected = list[things].id
               
                console.log(token)

                let deleteBody = {
                    "id" : selected,
                }
               
                axios.post(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/users/delete/`, deleteBody,  deleteOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))

                getData()
               
               
            }
        }
       
    }

    
    return (
        <div id="container">
            <p>Shopping List</p>
            <div id ="add-item">
                <form id="form" onSubmit={handleSubmit}>
                <input id="item-input" type="text" placeholder="Enter Item to add"></input>
                <button id="add-btn" type="submit">Add</button>
                </form>
            </div>
            <div id="list">
                <ul style={{"background-color":colors[theme].secondary }}>
                    {list.map((item,) =>( 
                    <div   className="item-cont">
                    <li id={item.id} key={item.id} onClick={handleChangeIt}>{item.listItem} </li>
                    <input id="checkbox" type="checkbox" onClick={handleChange}></input>
                    </div> 
                    ))}
                </ul>
            </div>
          
            <button id="clear" onClick={handleClear}>Clear Items</button>
        </div>
    )
}
