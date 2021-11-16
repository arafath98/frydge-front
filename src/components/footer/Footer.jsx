import React from 'react'
import "./Footer.css"
import { useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate()
    
    const handleItem = () => {
        navigate('/home')
        console.log('clicked')
    }
    return (
        <div>
            <footer className="footer">
                <div className="footerButtons">
                <a onClick={handleItem}>ITEMS</a>
                <a>ADD ITEM</a>
                <a>SHOPPING LIST</a>
                <a>PROFILE</a>
                </div>
            </footer>
            
        </div>
    )
}
