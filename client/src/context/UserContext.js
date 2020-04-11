import { createContext } from "react";
import React from 'react'
import useAuth from '../hooks/useAuth'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const user = useAuth()

  return(
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

