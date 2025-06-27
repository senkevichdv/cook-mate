import { AppRoot } from "@telegram-apps/telegram-ui"
import "@telegram-apps/telegram-ui/dist/styles.css"
import { useEffect, useMemo, useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Script from "next/script"
import { CssBaseline } from "@mui/material"
import { UserProvider } from "@/context/UserContext"

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        colorScheme?: 'light' | 'dark';
        themeParams?: Record<string, string>;
        onEvent?: (event: string, handler: () => void) => void;
        offEvent?: (event: string, handler: () => void) => void;
      };
    };
    TelegramGameProxy?: {
      receiveEvent?: (...args: unknown[]) => void;
    };
    TelegramWebviewProxy?: {
      postEvent?: (event: string, data: string) => void;
    };
  }
}

function getMuiTheme(mode: 'light' | 'dark', tgTheme?: Record<string, string>) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: tgTheme?.button_color || (mode === 'dark' ? '#2AABEE' : '#0088cc'),
      },
      background: {
        default: tgTheme?.bg_color || (mode === 'dark' ? '#222' : '#fff'),
        paper: tgTheme?.secondary_bg_color || (mode === 'dark' ? '#222' : '#fff'),
      },
      text: {
        primary: tgTheme?.text_color || (mode === 'dark' ? '#fff' : '#111'),
      },
    },
  })
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(
    typeof window !== 'undefined'
      ? window.Telegram?.WebApp?.colorScheme || 'light'
      : 'light'
  )
  const [tgTheme, setTgTheme] = useState<Record<string, string> | undefined>(
    typeof window !== 'undefined' ? window.Telegram?.WebApp?.themeParams : undefined
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.TelegramGameProxy) {
        window.TelegramGameProxy = { receiveEvent: () => {} }
      }
    }
  }, [])

  const theme = useMemo(() => getMuiTheme(mode, tgTheme), [mode, tgTheme])

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
      <AppRoot>
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

            if (window.TelegramWebviewProxy?.postEvent) {
              window.TelegramWebviewProxy.postEvent(
                "web_app_setup_closing_behavior",
                JSON.stringify({ need_confirmation: true })
              )
            }
          }}
        />
        <CssBaseline />
          <Component {...pageProps} />
        </AppRoot>
      </UserProvider>
    </ThemeProvider>
  )
}
