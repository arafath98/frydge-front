import React from 'react'
import "./Footer.css"
import { useNavigate } from "react-router-dom"
import Modal1 from '../../pages/Home/Modal1'

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
                <a onClick={handleList}>SHOPPING LIST</a>
                <Modal1/>
                <a onClick={handleProfile}>PROFILE</a>
                <a>SETTINGS</a>
                </div>
            </footer>
            
        </div>
    )
}
