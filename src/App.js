import React from 'react'
import { AddContactForm } from './components/AddContactForm'
import { ContactListDisplay } from './components/ContactListDisplay'
import { SignUp } from './components/SignUp'
import { AuthProvider } from './contexts/AuthContext'

//css
import { Container } from 'react-bootstrap'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AddContactForm />
        <ContactListDisplay />
        <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <SignUp />
          </div>
        </Container>
      </AuthProvider>
    </div>
  )
}

export default App
