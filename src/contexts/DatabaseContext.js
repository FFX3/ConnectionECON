import React, { useContext } from 'react'
import { database } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const DatabaseContext = React.createContext()

export const useDatabase = () => {
    return useContext(DatabaseContext)
}

export const DatabaseProvider = ({ children }) => {
    const { uid } = useAuth()

    const data = () => {
        if(uid){
            return database.ref(`users/${uid()}`).get()
        }
        return null
    }

    const downloadContactsList = () => {
        if(uid){
            return database.ref(`users/${uid()}/contacts_store/list`).get()
        }
        return null
    }

    const replaceContactStore = (newStore) => {
        console.log(newStore)
        if(uid){
            return database.ref(`users/${uid()}/contacts_store`).set(newStore)
        }
        return null
    }
    
    const value = {
        data,
        replaceContactStore,
        downloadContactsList,
    }
    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}