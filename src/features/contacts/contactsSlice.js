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
            //payload contains id reference to the object that will be deleted
            state.list[action.payload].stagedForDeletion = true
        },
        undoDeleteContact: (state, action) => {
            state.list[action.payload].stagedForDeletion = false
        },
        replaceList: (state, action) => {
            state.list = action.payload
            if(state.list === null){
                state.list = []
            }
        },
        removeContactsStagedForDeletion: (state) => {
            console.log(state.list)
            let newList = state.list.reduce((arr, currentContact)=>{
                console.log(currentContact)
                if(currentContact.stagedForDeletion !== true){
                    console.log(currentContact)
                    currentContact.id = arr.length
                    arr.push(currentContact)
                    return arr
                }
                return arr
            },[])
            state.list = newList
        },
    }
})
export const { addContact, deleteContact, undoDeleteContact, replaceList, removeContactsStagedForDeletion } = contactsSlice.actions

export const selectContacts = (state) => state.contacts.list
export const selectContactsStore = (state) => state.contacts


export default contactsSlice.reducer