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

    const justinsData = () => {
        return database.ref(`users/bxBFOUeyE4RhYBlu3D4U1NJ97M42`).get()
    }
    
    const value = {
        data,
        justinsData,
    }
    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}