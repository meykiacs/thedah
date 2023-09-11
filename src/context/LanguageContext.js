import { createContext, useState } from "@wordpress/element"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fa")
  const [dir, setDir] = useState("rtl")
  return (
    <LanguageContext.Provider value={{ lang, dir, setDir, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
