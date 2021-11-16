import React from 'react'
import "./Footer.css"
import { useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate()
    
    const handleItem = () => {
        navigate('/home')   
    }
    const handleList = () => {
        navigate('/list')
    }
    const handleProfile = () => {
        navigate('/profile')
    }
    return (
        <div>
            <footer className="footer">
                <div className="footerButtons">
                <a onClick={handleItem}>ITEMS</a>
                <a>ADD ITEM</a>
                <a onClick={handleList}>SHOPPING LIST</a>
                <a onClick={handleProfile}>PROFILE</a>
                </div>
            </footer>
            
        </div>
    )
}
