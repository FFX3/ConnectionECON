import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addContact } from '../features/contacts/contactsSlice'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'


export const AddContactForm = () => {
    
    //Redux
    const dispatch = useDispatch()
    //React State
    const [contact, setContact] = useState({})
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')

    const submitFormOnClick = (e) => {
        console.log(e.target)
        e.preventDefault()
        dispatch(addContact(contact))
        resetForm()
        updateNewContact()
    }

    const resetForm = () => {
        setFname('')
        setLname('')
        setEmail('')
        setContact({})
    }

    const updateFnameOnChange = (e) => {
        setFname(e.target.value)
    }

    const updateLnameOnChange = (e) => {
        setLname(e.target.value)
    }

    const updateEmailOnChange = (e) => {
        setEmail(e.target.value)
    }

    const updateNewContact = useCallback(() => {
        let newContact = {}
        newContact.fname = fname
        newContact.lname = lname
        newContact.email = email
        setContact(newContact)
    },[
        fname,
        lname,
        email,
    ])


    useEffect(()=>{
        updateNewContact()
    },[
        updateNewContact,
    ])

    return (
            <Form 
                onSubmit={submitFormOnClick}
                style={{ margin: "20px"}}
            >
                <Row>
                    <Col xs="12" md="3">
                        <Form.Control
                            type="text"
                            value={fname}
                            placeholder="First Name"
                            onChange={updateFnameOnChange}
                        ></Form.Control>
                    </Col>
                    <Col xs="12" md="3">
                        <Form.Control
                            type="text"
                            value={lname}
                            placeholder="Last Name"
                            onChange={updateLnameOnChange}
                        ></Form.Control>
                    </Col>
                    <Col xs="12" md="3">
                        <Form.Control
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={updateEmailOnChange}
                        ></Form.Control>
                    </Col>
                    <Col xs="12" md="3">
                        <Button
                            variant="success"
                            type="submit"
                        >
                            Add contact
                        </Button>
                    </Col>
                </Row>
            </Form>
    )
}