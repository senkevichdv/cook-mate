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
      borderRadius: 16,
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height: 56,
            borderRadius: 16,
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 8px 24px ${colors.shadow}`,
              transform: 'translateY(-2px)',
            },
          },
          contained: {
            background: colors.gradient || colors.accent,
            '&:hover': {
              background: colors.gradient || colors.accent,
              opacity: 0.9,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: `0 4px 20px ${colors.shadow}`,
            border: 'none',
            borderRadius: 16,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: '16px !important',
            overflow: 'hidden',
            '&:before': {
              display: 'none',
            },
            marginBottom: 12,
            boxShadow: `0 2px 12px ${colors.shadow}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: `0 2px 8px ${colors.shadow}`,
              },
              '&.Mui-focused': {
                boxShadow: `0 4px 12px ${colors.shadow}`,
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  })
}
