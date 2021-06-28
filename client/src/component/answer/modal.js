import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';

function Username(props) {
    const context = useContext(UserContext);
    const [show, setShow] = useState(true);
    const [validated, setValidated] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget
        if (form.checkValidity())
            handleClose()

        else
            setValidated(true)
    }

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>Enter your Name</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Control placeholder="Enter your name to continue "
                            required bsPrefix="form-control required" 
                            
                            onChange={ev => props.setUser(ev.target.value)} />
                        <Form.Control.Feedback type='invalid'>Enter your name to continue </Form.Control.Feedback>
                    </Modal.Body>
                    <Modal.Footer>
                        {context.loggedIn ?

                            <Link to='/mysurvey' >
                                <Button variant="danger" onClick={handleClose}>
                                    Back to main
                                </Button>
                            </Link> :
                            <Link to='/'>
                                <Button variant="danger" onClick={handleClose}>
                                    Back to main
                                </Button>
                            </Link>
                        }
                        <Button type="submit" variant="primary">submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}



function ConFrmModal(props) {
    const context = useContext(UserContext);
    return (



        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title>Lap's Survey Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
                {context.loggedIn ?

                    <Link to='/mysurvey' >
                        <Button variant="primary" >
                            OK
                        </Button>
                    </Link> :
                    <Link to='/'>
                        <Button variant="primary" >
                            OK
                        </Button>
                    </Link>
                }

            </Modal.Footer>
        </Modal>

    );
}


export { Username, ConFrmModal };