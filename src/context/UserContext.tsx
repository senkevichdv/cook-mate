"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface UserInfo {
  id: string | null
  firstName?: string
  username?: string
}

const UserContext = createContext<UserInfo | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    try {
      const tgUser = window.Telegram?.WebAppUser
      if (tgUser) {
        setUser({
          id: tgUser.id.toString(),
          firstName: tgUser.first_name,
          username: tgUser.username,
        })
      } else {
        setUser(null)
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setUser(null)
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
