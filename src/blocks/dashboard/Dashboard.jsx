import { MantineProvider, createTheme } from "@mantine/core"
import rtlPlugin from "stylis-plugin-rtl"
import {MantineGlobal} from "../../components/MantineGlobal"
import "../../utils/i18n"
import { BooksProvider } from "../../context/BooksContext"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Shell } from "../../components/dashboard/Shell"
import { useState } from "@wordpress/element"
import { ResourceProvider } from "../../context/ResourceContext"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"

export default function Dashboard({ providedValues }) {
  useLanguageAndDirection()
  const [colorScheme, setColorScheme] = useState("light")
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const { dir } = useLanguageContext()
  const theme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
    dir,
    colorScheme: colorScheme,
  })

  return (
    <MantineProvider
    withCssVariables
      // withGlobalStyles
      // withNormalizeCSS
      theme={theme}
      // emotionCache={dir === "rtl" ? rtlCache : undefined}
    >
      <WPProvider providedValues={providedValues}>
        <ResourceProvider providedValues={providedValues}>
          <BooksProvider providedValues={providedValues}>
            <MantineGlobal />
            <Shell />
          </BooksProvider>
        </ResourceProvider>
      </WPProvider>
    </MantineProvider>
  )
}
