import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { AddContactForm } from './AddContactForm'
import { ContactListDisplay } from './ContactListDisplay'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import { Link, useHistory } from 'react-router-dom'

export const Dashboard = () => {

    const [error, setError] = useState('')
    const { currentUser, logout, uid } = useAuth()

    const { data, justinsData } = useDatabase()

    if(currentUser){
        console.log(uid())

        data().then(DataSnapshot => {
            console.log(DataSnapshot.val())
        })
    
        justinsData().then(DataSnapshot => {
            console.log(DataSnapshot.val())
        })
    }
    
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

    return (
        <>
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
