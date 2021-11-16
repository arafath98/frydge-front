import React, {useState, useContext} from 'react'
import "./Footer.css"
import { useNavigate } from "react-router-dom"
import Modal1 from '../../pages/Home/Modal1'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { Context } from "../../Context";
import Darkmode from '../../pages/Home/Darkmode'

export default function Footer() {
    const { isLoggedIn, setIsLoggedIn, theme, colors, setTheme  } = useContext(Context);
    const [check, setCheck] = useState(false)
  

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
    const logout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }
    const handleClick = () => {
        theme == 'dark' ? setCheck(true): setCheck(false)
        
    }

    const handleDm = () => {
        theme == 'light' ? setTheme('dark'): setTheme('light')
    }

    return (
        <div>
            <footer className="footer">
                <div className="footerButtons">
                <a onClick={handleItem}>ITEMS</a>
                <a onClick={handleList}>SHOPPING LIST</a>
                <Modal1/>
                <a onClick={handleProfile}>PROFILE</a>
                <DropdownButton id="dropdown-basic-button" title="SETTINGS" onClick={handleClick}>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    <Dropdown.Item onClick={handleDm}>{<Darkmode/>}</Dropdown.Item>
                </DropdownButton>
                </div>
            </footer>
            
        </div>
    )
}
