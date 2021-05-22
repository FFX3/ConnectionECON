import React, { useContext, useEffect, useState } from 'react'
import { database } from '../firebase'

const DatabaseContext = React.createContext()

export const useDatabase = () => {
    return useContext(DatabaseContext)
}

export const DatabaseProvider = ({ children }) => {
    const [data, setData] = useState()

    let emailListRef = database.ref('emailLists')

    const value = {
        data,
    }

    useEffect(()=>{
        emailListRef.on('value', (snapshot) => {
            setData(snapshot.val())
        })
    },[])

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}