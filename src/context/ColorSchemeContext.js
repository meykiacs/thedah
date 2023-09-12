import  { createContext,  useState } from "@wordpress/element"

export const ColorSchemeContext = createContext()

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState('light')

  const toggleColorScheme = () => {
    setColorScheme(c => c === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}
