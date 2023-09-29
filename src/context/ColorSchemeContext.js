import  { createContext,  useEffect,  useState } from "@wordpress/element"

export const ColorSchemeContext = createContext()

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(localStorage.getItem('colorscheme') || 'light')

  useEffect(() => {
    localStorage.setItem('colorscheme', colorScheme)
    document.cookie = `colorscheme=${colorScheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }, [colorScheme])

  const toggleColorScheme = () => {
    setColorScheme(c => c === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  )
}
