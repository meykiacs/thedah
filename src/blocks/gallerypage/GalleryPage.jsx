import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"
import { useTitleAndMeta } from "../../hooks/useTitleAndMeta"
import { DirectionProvider, MantineProvider, createTheme } from "@mantine/core"
import useLanguageContext from "../../context/useLanguageContext"
import { MantineGlobal } from "../../components/MantineGlobal"
import { GalleryGrid } from "./GalleryGrid"

export function GalleryPage({ providedValues }) {
  useLanguageAndDirection()
  const { dir } = useLanguageContext()
  const mantineTheme = createTheme({
    fontFamily: "Vazirmatn, sans-serif",
    headings: { fontFamily: "Vazirmatn, sans-serif" },
  })
  const theme = useCustomTheme()

  useTitleAndMeta(providedValues.title, providedValues.description)

  return (
    <DirectionProvider initialDirection={dir} detectDirection={false}>
      <RtlProvider>
        <MantineProvider withCssVariables theme={mantineTheme}>
          <ThemeProvider theme={theme}>
            <WPProvider providedValues={providedValues}>
              <ResourceProvider providedValues={providedValues}>
                <MantineGlobal />
                <GlobalCss />
                <Header />
                <PageContainer color={theme.colors.gray}>
                  <GalleryGrid />
                </PageContainer>
                <PageContainer color={theme.colors.white}>
                </PageContainer>
                <Footer />
                <SubFooter />
              </ResourceProvider>
            </WPProvider>
          </ThemeProvider>
        </MantineProvider>
      </RtlProvider>
    </DirectionProvider>
  )
}
