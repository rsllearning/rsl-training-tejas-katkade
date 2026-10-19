import { useState } from 'react'
import { UserContext } from './userContextDef'

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: Boolean(user),
  }

  return (
    <UserContext value={value}>
      {children}
    </UserContext>
  )
}
