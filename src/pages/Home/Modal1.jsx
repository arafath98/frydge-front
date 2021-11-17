import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Scanner from './Scanner';
import './home.css'
import { Context } from "../../Context";
const Modal1 = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { theme, colors, setTheme } = useContext(Context);

    return (
        <>
            <div className='text-center'>

                <Button id="add-button" variant="primary" onClick={handleShow}>
                    <span id="plus" className={theme == 'light' ? 'plusl' : 'plusd'}>+</span>
                </Button>

            </div>

            <Modal className={theme == 'dark' ? "mdl-dark" : ""} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="text-center">
                        <Modal.Title>Scan Barcode Below</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Scanner />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)

}

export default Modal1
