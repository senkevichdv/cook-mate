import React, { createContext, useContext, ReactNode } from "react"

export interface UserInfo {
  id: number
  first_name: string
  last_name: string
  username: string
  language_code: string
  is_premium: boolean
  allows_write_to_pm: boolean
}

const UserContext = createContext<UserInfo | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({
  user,
  children,
}: {
  user: UserInfo | null
  children: ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
