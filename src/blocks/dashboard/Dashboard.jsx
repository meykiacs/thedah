import {
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache,
} from "@mantine/core"
import rtlPlugin from "stylis-plugin-rtl"
import Fonts from "../../components/MantineFonts"
import "../../utils/i18n"
import { BooksProvider } from "../../context/BooksContext"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import Shell from "../../components/dashboard/Shell"
import { useState } from "@wordpress/element"
import { ResourceProvider } from "../../context/ResourceContext"

const rtlCache = createEmotionCache({
  key: "mantine-rtl",
  stylisPlugins: [rtlPlugin],
})

export default function Dashboard({ providedValues }) {
  // const [colorScheme, toggleColorScheme] = useToggle(["light", "dark"])
  const [colorScheme, setColorScheme] = useState("light")
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const { dir } = useLanguageContext()
  const theme = {
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
    dir,
    colorScheme: colorScheme,
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        emotionCache={dir === "rtl" ? rtlCache : undefined}
      >
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <BooksProvider providedValues={providedValues}>
              <Fonts />
              <Shell />
            </BooksProvider>
          </ResourceProvider>
        </WPProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
