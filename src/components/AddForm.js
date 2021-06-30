import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { EmployeeContext } from '../contexts/EmployeeContext'

const AddForm = () => {

    const { addEmployee } = useContext(EmployeeContext)

    const [newEmployee, setNewEmployee] = useState({
        name:"", email:"", address:"", phone:""
    })

    const {name, email, address, phone} = newEmployee

    const onInputChange = e => {
        setNewEmployee({...newEmployee, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addEmployee(name, email, address, phone)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange={e => onInputChange(e)}
                    required    
                />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={e => onInputChange(e)}
                    required    
                />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Control
                    as="textarea"
                    placeholder="Address *"
                    name="address"
                    value={address}
                    onChange={e => onInputChange(e)}
                    rows={3}    
                />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={e => onInputChange(e)}
                />
            </Form.Group>
            <Button className="w-100"variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>
    )
}

export default AddForm