import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Scanner from './Scanner';
const Modal1 = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className='justify-content-center' onClick={handleShow}>
                Add Item
            </Button>

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
