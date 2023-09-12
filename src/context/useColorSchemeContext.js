import { useContext } from "@wordpress/element"
import { ColorSchemeContext } from "./ColorSchemeContext"

export const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext)
  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider")
  }
  return context
}
