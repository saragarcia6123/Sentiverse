import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<{
  darkEnabled: boolean;
  toggleTheme: () => void;
}>({ darkEnabled: false, toggleTheme: () => null });

/**
 * Uses local storage variable 'theme' to manage current theme state
 * @param innerContent (ReactNode) -  The content to wrap the theme toggle in
 * @returns The wrapper to toggle theme with the inner element contained
 */
function ThemeProvider({ children }: { children: ReactNode }) {
  // Function to auto-detect prefered system theme
  function getPreferredTheme(): boolean {
    const darkEnabled: boolean = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return darkEnabled;
  }

  // Default to the theme in browser
  const [darkEnabled, setDarkEnabled]: [
    darkEnabled: boolean,
    setDarkEnabled: Dispatch<SetStateAction<boolean>>
  ] = useState(
    localStorage.getItem("darkEnabled") === "true" || getPreferredTheme()
  );

  // Runs every time theme is changed and updates the DOM elements
  useEffect(() => {
    // Update theme state in local storage
    localStorage.setItem("darkEnabled", darkEnabled ? "true" : "false");

    // Add '.dark' class to all DOM elements
    document.documentElement.classList.toggle("dark", darkEnabled);
  }, [darkEnabled]);

  // The callable to update theme in local storage
  function toggleTheme(): void {
    setDarkEnabled(!darkEnabled);
  }

  return (
    <ThemeContext.Provider value={{ darkEnabled, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
