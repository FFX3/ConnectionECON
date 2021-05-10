import { createSlice } from '@reduxjs/toolkit'

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState:{
        value: []
    },
    reducers: {
        addContact: (state, action) => {
            state.value.push(action.payload)
        }
    }
})
export const { addContact } = contactsSlice.actions

export const selectContacts = (state) => state.contacts.value


export default contactsSlice.reducer