import React, {useState, useContext} from 'react'
import "./Footer.css"
import { useNavigate } from "react-router-dom"
import Modal1 from '../../pages/Home/Modal1'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { Context } from "../../Context";
import Darkmode from '../../pages/Home/Darkmode'
import {FaShoppingBasket,FaEdit,FaUserCircle, FaCog } from "react-icons/fa";

export default function Footer() {
    const { isLoggedIn, setIsLoggedIn, theme, colors, setTheme  } = useContext(Context);
    const [check, setCheck] = useState(false)
    const [page, setPage] = useState('item')
  

    const navigate = useNavigate()
    
    const handleItem = () => {
        navigate('/home')   
        setPage('item')
    }
    const handleList = () => {
        navigate('/list')
        setPage('list')
    }
    const handleProfile = () => {
        navigate('/profile')
        setPage('profile')
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
                <a  onClick={handleItem}>{<FaShoppingBasket className={page == 'item' ? 'selected nav-btn': 'nav-btn'}id="item-button" />}</a>
                <a   onClick={handleList}>{<FaEdit id="shopping-list-button" className={page == 'list' ? 'selected nav-btn': 'nav-btn'}/>}</a>
                <Modal1 className="nav-btn" id="add-button" />
                <a  onClick={handleProfile}><FaUserCircle id ="profile-button" className={page == 'profile' ? 'selected nav-btn': 'nav-btn'}/></a>
                <DropdownButton id="dropdown-basic-button"  title={<FaCog className="nav-btn" id="settings" />} onClick={handleClick}>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    <Dropdown.Item onClick={handleDm}>{<Darkmode/>}</Dropdown.Item>
                </DropdownButton>
                </div>
            </footer>
            
        </div>
    )
}
