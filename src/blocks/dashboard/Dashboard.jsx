import { DirectionProvider, MantineProvider, createTheme } from "@mantine/core"
import { MantineGlobal } from "../../components/MantineGlobal"
import "../../utils/i18n"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Shell } from "../../components/dashboard/Shell"
import { ResourceProvider } from "../../context/ResourceContext"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import { CrudContextProvider } from "../../context/CrudContext"

export default function Dashboard({ providedValues }) {
  useLanguageAndDirection()

  const { dir } = useLanguageContext()
  const theme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
  })

  return (
    <DirectionProvider initialDirection={dir} detectDirection={false}>
      <MantineProvider withCssVariables theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <CrudContextProvider>
              <MantineGlobal />
              <Shell />
            </CrudContextProvider>
          </ResourceProvider>
        </WPProvider>
      </MantineProvider>
    </DirectionProvider>
  )
}
