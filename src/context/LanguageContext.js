import { createContext, useState, useEffect } from "@wordpress/element"

const LanguageContext = createContext()

export const LanguageProvider = ({ direction, language, children }) => {

  const [lang, setLang] = useState(language || localStorage.getItem('language') || 'fa')
  const [dir, setDir] = useState(direction || localStorage.getItem('direction') || 'rtl')

  useEffect(() => {
    localStorage.setItem('language', lang)
    localStorage.setItem('direction', dir)
    document.cookie = `language=${lang}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }, [lang, dir])

  return (
    <LanguageContext.Provider value={{ lang, dir, setDir, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
