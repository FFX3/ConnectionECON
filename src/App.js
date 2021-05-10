import React from 'react'
import { AddContactForm } from './components/AddContactForm'
import { ContactListDisplay } from './components/ContactListDisplay'
import './App.css';

function App() {
  return (
    <div className="App">
      <AddContactForm />
      <ContactListDisplay />
    </div>
  );
}

export default App;
