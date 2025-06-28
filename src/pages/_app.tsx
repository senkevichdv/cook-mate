import { useEffect, useMemo, useState } from "react"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import Script from "next/script"
import { CssBaseline } from "@mui/material"
import { UserInfo, UserProvider } from "@/context/UserContext"
import { getMuiTheme } from "@/theme/createMuiTheme"

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        colorScheme?: "light" | "dark"
        themeParams?: Record<string, string>
        onEvent?: (event: string, handler: () => void) => void
        offEvent?: (event: string, handler: () => void) => void
        initDataUnsafe?: {
          user?: UserInfo
        }
      }
    }
    TelegramGameProxy?: {
      receiveEvent?: (...args: unknown[]) => void
    }
    TelegramWebviewProxy?: {
      postEvent?: (event: string, data: string) => void
    }
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [mode, setMode] = useState<"light" | "dark">(
    typeof window !== "undefined"
      ? window.Telegram?.WebApp?.colorScheme || "light"
      : "light"
  )
  const [tgTheme, setTgTheme] = useState<Record<string, string> | undefined>(
    typeof window !== "undefined"
      ? window.Telegram?.WebApp?.themeParams
      : undefined
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.TelegramGameProxy) {
        window.TelegramGameProxy = { receiveEvent: () => {} }
      }
    }
  }, [])

  const theme = useMemo(() => getMuiTheme(mode, tgTheme), [mode, tgTheme])

  return (
    <ThemeProvider theme={theme}>
      <Script
        id="TelegramWebApp"
        src="https://telegram.org/js/telegram-web-app.js"
        onReady={() => {
          const tg = window.Telegram?.WebApp
          if (tg && tg.onEvent) {
            const handler = () => {
              setMode(tg.colorScheme || "light")
              setTgTheme(tg.themeParams)
            }

            tg.onEvent("themeChanged", handler)
          }

          const tgUser = tg?.initDataUnsafe?.user
          if (tgUser) {
            setUser(tgUser)
          }

          if (window.TelegramWebviewProxy?.postEvent) {
            window.TelegramWebviewProxy.postEvent(
              "web_app_setup_closing_behavior",
              JSON.stringify({ need_confirmation: true })
            )
          }
        }}
      />
      <UserProvider user={user}>
        <CssBaseline />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}
