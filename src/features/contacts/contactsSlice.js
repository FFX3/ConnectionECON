import { createSlice } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState:{
        list: [],
    },
    reducers: {
        addContact: (state, action) => {
            if(action.payload.hasOwnProperty('id')){
                console.log("WARNING the contact's ID will be overridden by the addContact reducer")
            }
            action.payload.id = state.list.length
            state.list.push(action.payload)
        },
        deleteContact: (state, action) => {
            //payload contains ID reference to the object that will be deleted
            state.list[action.payload] = null
        }
    }
})
export const { addContact, deleteContact } = contactsSlice.actions

export const selectContacts = (state) => state.contacts.list


export default contactsSlice.reducer