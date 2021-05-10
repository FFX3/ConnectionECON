import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addContact, selectContacts } from '../features/contacts/contactsSlice'

export const AddContactForm = () =>{
    //Redux
    const contacts = useSelector(selectContacts)
    const dispatch = useDispatch()
    //React State
    const [contact, setContact] = useState({})
    const [id, setId] = useState(0)
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    
    const submitFormOnClick = (e) => {
        e.preventDefault()
        if(Object.keys(contact).length === 0){
            console.log('contact is empty')
            return
        }
        dispatch(addContact(contact))
        setFname('')
        setLname('')
        setContact({})
    }

    const updateFnameOnChange = (e) => {
        setFname(e.target.value)
    }

    const updateLnameOnChange = (e) => {
        setLname(e.target.value)
    }
    
    useEffect(()=>{
        setId(contacts.length)
    },[contacts.length])

    useEffect(()=>{
        let newContact = {}
        newContact.id = id
        newContact.fname = fname
        newContact.lname = lname
        setContact(newContact)
    },[
        id,
        fname,
        lname,
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
            <button
                onClick={submitFormOnClick}
            >
            Add empty contact
            </button>
        </div>
    )
}