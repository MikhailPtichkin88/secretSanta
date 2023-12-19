import { useContext } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/const'

interface UseThemeProps {
  theme: Theme
  toggleTheme: () => void
}

export function useTheme(): UseThemeProps {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    setTheme?.(newTheme)
  }

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  }
}
