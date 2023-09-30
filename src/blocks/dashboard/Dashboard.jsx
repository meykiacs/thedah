import { DirectionProvider, MantineProvider, createTheme } from "@mantine/core"
import rtlPlugin from "stylis-plugin-rtl"
import { MantineGlobal } from "../../components/MantineGlobal"
import "../../utils/i18n"
import { BooksProvider } from "../../context/BooksContext"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Shell } from "../../components/dashboard/Shell"
import { useState } from "@wordpress/element"
import { ResourceProvider } from "../../context/ResourceContext"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import { EditContextProvider } from "../../context/EditContext"

export default function Dashboard({ providedValues }) {
  useLanguageAndDirection()

  const { dir } = useLanguageContext()
  const theme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
  })

  return (
    <DirectionProvider initialDirection={dir} detectDirection={false}>
      <MantineProvider
        // defaultColorScheme={providedValues.colorScheme}
        withCssVariables
        // withGlobalStyles
        // withNormalizeCSS
        theme={theme}
        // emotionCache={dir === "rtl" ? rtlCache : undefined}
      >
        <EditContextProvider>
          <WPProvider providedValues={providedValues}>
            <ResourceProvider providedValues={providedValues}>
              <BooksProvider providedValues={providedValues}>
                <MantineGlobal />
                <Shell />
              </BooksProvider>
            </ResourceProvider>
          </WPProvider>
        </EditContextProvider>
      </MantineProvider>
    </DirectionProvider>
  )
}
