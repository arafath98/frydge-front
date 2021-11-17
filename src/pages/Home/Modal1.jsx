import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Scanner from './Scanner';
import './home.css'
const Modal1 = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className='text-center'>

            <Button id="add-button" variant="primary" onClick={handleShow}>
                <span id="plus" >+</span>
            </Button>

        </div>

            <Modal show={show} onHide={handleClose}>
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
                    {/* <Button variant="primary" onClick={handleClose}>
                        Get Data
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>)

}

export default Modal1
