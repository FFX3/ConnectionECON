import { useSelector } from 'react-redux'
import { selectContacts, deleteContact } from '../features/contacts/contactsSlice'
import { store } from '../app/store'
import { DeletedContactPlaceHolder } from './DeletedContactPlaceHolder'

export const ContactListDisplay = () => {

    const contactsList = useSelector(selectContacts)

    let contacts = null

    if(contactsList){
        contacts = contactsList.map((contact) => {
            if(contact !== null){
                let newContact = {...contact}
                newContact.deleteSelf = ()=>{store.dispatch(deleteContact(contact.id))}
                return newContact
            }
            return null
        })
    }

    const generateListHtml = () => {
        let listArr = []
        if(contacts){
            contacts.map((contact, i) => {
                if(contact.stagedForDeletion === true){
                    listArr.push(
                        <DeletedContactPlaceHolder key={contact.id} id={contact.id}/>
                    )
                }else{
                    listArr.push(
                        <div key={contact.id}>
                            <li>{`First name:${contact.fname}, Last Name: ${contact.lname}, Email: ${contact.email}`}</li>
                            <button onClick={contact.deleteSelf}>Delete Contact</button>
                        </div>
                    )
                }
            })}
        return listArr
    }

    return(
        <ul>
            {
                generateListHtml()
            }
        </ul>
    )
}