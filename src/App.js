import React from 'react'
import { AddContactForm } from './components/AddContactForm'
import { ContactListDisplay } from './components/ContactListDisplay'
import { SignUp } from './components/SignUp'
import { Container } from 'react-bootstrap'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <AddContactForm />
      <ContactListDisplay />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <SignUp />
        </div>
      </Container>
    </div>
  )
}

export default App
