import React, { useEffect, useState } from 'react'
import { Card, Button, Alert, Col, Row, Container } from 'react-bootstrap'
import { AddContactForm } from './AddContactForm'
import { ContactListDisplay } from './ContactListDisplay'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import { Link, useHistory } from 'react-router-dom'
//
import { selectContacts, selectContactsStore } from '../features/contacts/contactsSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { replaceList, removeContactsStagedForDeletion } from '../features/contacts/contactsSlice'

export const Dashboard = () => {

    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [needToDowloadData, setNeedToDowloadData] = useState(true)
    //this next line is just for proof of concept, the logic will be move to contactsSlice.js
    const [tempDownload, setTempDownload] = useState()

    const { currentUser, logout, uid } = useAuth()

    const { replaceContactStore, downloadContactsList } = useDatabase()
    const contactsStore = useSelector(selectContactsStore)

    
    useEffect(()=>{
        if(currentUser){
            console.log(uid())
    
            if(needToDowloadData){
                downloadContactsList().then(DataSnapshot => {
                    setTempDownload(DataSnapshot.val())
                    dispatch(replaceList(DataSnapshot.val()))
                    setNeedToDowloadData(false)
                })
            }
        } 
    },[currentUser])

    const history = useHistory()

    const handleLogout = (e) => {
        setError('')

        try {
            logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    const stageContactForDeletionOnClick = (e) => {
        e.target.blur()
        dispatch({type:'contacts/removeContactsStagedForDeletion'})
        console.log(contactsStore)
    }

    useEffect(()=>{
        if(!needToDowloadData){
            console.log(contactsStore)
            replaceContactStore(contactsStore)
        }
    },[contactsStore, needToDowloadData])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="2"
                        style={{ 
                            position: "fixed",
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Card>
                            <Card.Body>
                                <h2 className="test-center mb-4">Profile</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <strong>Email: </strong> {currentUser && currentUser.email}
                                <Button variant="link" onClick={handleLogout}>Log Out</Button>
                            </Card.Body>
                        </Card>
                        <Card body style={{ maxWidth: '300px', margin: '25px auto 25px auto' }}>
                            <Button style={{ margin: '15px auto 15px auto'}} variant="danger" onClick={stageContactForDeletionOnClick}>Delete Selected Contacts!</Button>
                            <Card.Text>
                                WARNING: This action cannot be undone
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col xs={{ span: 10, offset: 2 }} className="">
                        <Row>
                            <Col>
                                <Card style={{ margin: "20px" }}>
                                    <Card.Header>
                                        <AddContactForm />
                                    </Card.Header>
                                    <Card.Body>
                                        <ContactListDisplay />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
