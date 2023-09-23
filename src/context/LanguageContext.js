import { createContext, useState } from "@wordpress/element"

const LanguageContext = createContext()

export const LanguageProvider = ({ direction, language, children }) => {
  const [lang, setLang] = useState(language)
  const [dir, setDir] = useState(direction)
  return (
    <LanguageContext.Provider value={{ lang, dir, setDir, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
