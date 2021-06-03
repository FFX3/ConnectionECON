import React, { useEffect, useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
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

    const handleLogout = () => {
        setError('')

        try {
            logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    const uploadStoreOnclick = () => {
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
            <Button onClick={uploadStoreOnclick}>Upload Store!</Button>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="test-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {currentUser && currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </div>
            <Card>
                <AddContactForm />
                <ContactListDisplay />
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
