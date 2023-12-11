import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "../lib/ThemeContext";
import {ReactNode, useMemo, useState} from "react";

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider = ({children, initialTheme}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const props = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={props}>{children}</ThemeContext.Provider>
  );
};
