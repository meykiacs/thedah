import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import ToggleColorScheme from "../../components/common/ToggleColorScheme"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { RtlProvider } from "../../context/RtlProvider"
import { lightTheme, darkTheme } from "../../utils/theme"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import Footer from "../../components/common/Footer"
import styled from "@emotion/styled"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import AboutBanner from "../../components/paperpage/AboutBanner"
import { SectionTitle } from "../../components/common/SectionTitle"

export default function AboutPage({ providedValues }) {
  const { colorScheme } = useColorSchemeContext()

  const { dir } = useLanguageContext()

  const theme = {
    fontFamily: "Vazirmatn, sans-serif",
    direction: dir,
    colors: colorScheme === "dark" ? darkTheme.colors : lightTheme.colors,
    breakpoints,
  }

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
              <AboutBanner />
            <PageContainer color={theme.colors.gray}>
              <SectionTitle />
            </PageContainer>
            <Footer />
            <SubFooter />
            <ToggleColorScheme />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
