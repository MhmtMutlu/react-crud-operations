import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../contexts/EmployeeContext'
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from './EditForm';

const Employee = ({ employee }) => {

    const { deleteEmployee } = useContext(EmployeeContext)

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose();
    }, [employee]);
    
    return (
        <React.Fragment>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button 
                        className="btn text-warning btn-act" 
                        data-toggle="modal"
                        onClick={handleShow}
                    >
                            <i className="material-icons">&#xE254;</i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                }>
                    <button
                        className="btn text-danger btn-act" data-toggle="modal"
                        onClick={() => deleteEmployee(employee.id)}
                    >
                            <i className="material-icons">&#xE872;</i>
                    </button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm employee={employee}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>        
    )
}

export default Employee