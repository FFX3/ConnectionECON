import { useSelector } from 'react-redux'
import { selectContacts } from '../features/contacts/contactsSlice'

export const ContactListDisplay = () => {

    const contacts = useSelector(selectContacts)

    return(
        <ul>
            {contacts.map((contact) => {
                return(
                    <li>{contact.fname}</li>
                )
            })}
        </ul>
    )
}