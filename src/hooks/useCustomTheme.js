import { useEffect, useState } from "@wordpress/element"
import { darkTheme, lightTheme } from "../utils/theme"
import { useColorSchemeContext } from "../context/useColorSchemeContext"
import useLanguageContext from "../context/useLanguageContext"
import { breakpoints } from "../utils/mq"

export function useCustomTheme() {
  const { colorScheme } = useColorSchemeContext()
  const { dir } = useLanguageContext()

  const [theme, setTheme] = useState({
    fontFamily: "Vazirmatn, sans-serif",
    direction: dir,
    colors: colorScheme === "dark" ? darkTheme.colors : lightTheme.colors,
    breakpoints,
  })

  useEffect(() => {
    setTheme({
      fontFamily: "Vazirmatn, sans-serif",
      direction: dir,
      colors: colorScheme === "dark" ? darkTheme.colors : lightTheme.colors,
      breakpoints,
    })
  }, [colorScheme, dir])

  return theme
}
