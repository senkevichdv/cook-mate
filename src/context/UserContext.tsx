import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { retrieveLaunchParams } from "@telegram-apps/sdk"

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
      const { tgWebAppData } = retrieveLaunchParams()
      if (tgWebAppData?.user) {
        setUser({
          id: tgWebAppData?.user.id.toString(),
          firstName: tgWebAppData?.user.first_name,
          username: tgWebAppData?.user.username,
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
