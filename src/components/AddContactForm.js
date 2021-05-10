import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addContact } from '../features/contacts/contactsSlice'


export const AddContactForm = () => {
    
    //Redux
    const dispatch = useDispatch()
    //React State
    const [contact, setContact] = useState({})
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    
    const isNameFilledInFields = (contact) => {
        if(contact['fname'] === ''){
            return false
        }
        return true
    }
    const submitFormOnClick = (e) => {
        e.preventDefault()
        if(Object.keys(contact).length === 0){
            console.log('contact is empty')
            return
        }
        if(!isNameFilledInFields(contact)){
            alert('Please fill in all required fields')
            return
        }
        dispatch(addContact(contact))
        resetForm()
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

    useEffect(()=>{
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

    return (
        <div>
            <input 
                type="text"
                value={fname}
                placeholder="First Name"
                onChange={updateFnameOnChange}
            ></input>
            <input 
                type="text"
                value={lname}
                placeholder="Last Name"
                onChange={updateLnameOnChange}
            ></input>
            <input 
                type="text"
                value={email}
                placeholder="Email"
                onChange={updateEmailOnChange}
            ></input>
            <button
                onClick={submitFormOnClick}
            >
            Add empty contact
            </button>
        </div>
    )
}