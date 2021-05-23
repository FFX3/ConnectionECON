import { useSelector } from 'react-redux'
import { selectContacts, deleteContact } from '../features/contacts/contactsSlice'
import { store } from '../app/store'

export const ContactListDisplay = () => {

    const contactsList = useSelector(selectContacts)
    const contacts = contactsList.map((contact) => {
        if(contact !== null){
            let newContact = {...contact}
            newContact.deleteSelf = ()=>{store.dispatch(deleteContact(contact.id))}
            return newContact
        }
        return null
    })

    return(
        <ul>
            {contacts.map((contact, i) => {
                if(contact === null){
                    return (
                        <div key={i}>
                            <h1>contact has been deleted</h1>
                        </div>
                    )
                }
                return(
                    <div key={contact.id}>
                        <li>{`First name:${contact.fname}, Last Name: ${contact.lname}, Email: ${contact.email}`}</li>
                        <button onClick={contact.deleteSelf}>Delete Contact</button>
                    </div>
                )
            })}
        </ul>
    )
}