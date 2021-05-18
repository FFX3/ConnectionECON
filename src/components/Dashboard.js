import React from 'react'

//components
import { AddContactForm } from './AddContactForm'
import { ContactListDisplay } from './ContactListDisplay'

export const Dashboard = () => {
    return (
        <>
            <AddContactForm />
            <ContactListDisplay />
        </>
    )
}
