import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(passwordRef.current.value !==
            passwordConfirmRef.current.value){
                return setError('Password do not match')
        }
        try {
            setError('')
            setLoading(true)
            signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to creat an account, please try again')
        }
        setLoading(false)
    }

    return(
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required ref={emailRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" required ref={passwordConfirmRef}></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have and account? Log In
        </div>
        </>
    )
}