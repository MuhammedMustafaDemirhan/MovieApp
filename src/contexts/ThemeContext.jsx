import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : "light";
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
