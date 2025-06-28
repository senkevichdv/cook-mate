import { createTheme } from "@mui/material/styles"
import { darkColors, lightColors } from "./palette"

export function getMuiTheme(
  mode: "light" | "dark",
  tgTheme?: Record<string, string>
) {
  const colors = mode === "dark" ? darkColors : lightColors

  const background = {
    default: tgTheme?.bg_color || colors.background,
    paper: tgTheme?.secondary_bg_color || colors.card,
  }
  const text = {
    primary: tgTheme?.text_color || colors.text,
    secondary: tgTheme?.hint_color || colors.textSecondary,
  }
  const primary = {
    main: tgTheme?.accent_text_color || colors.accent,
  }
  const error = {
    main: tgTheme?.danger_color || colors.danger,
  }

  return createTheme({
    palette: {
      mode,
      background,
      text,
      primary,
      error,
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height: 56,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: `0 2px 8px ${colors.shadow}`,
            border: `1px solid ${colors.border}`,
          },
        },
      },
      // Add more component overrides as needed
    },
  })
}
