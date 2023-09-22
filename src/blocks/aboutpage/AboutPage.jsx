import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import { SectionTitle } from "../../components/common/SectionTitle"
import SubFooter from "../../components/common/SubFooter"
import ToggleColorScheme from "../../components/common/ToggleColorScheme"
import AboutBanner from "../../components/paperpage/AboutBanner"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import useLanguageContext from "../../context/useLanguageContext"
import "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { darkTheme, lightTheme } from "../../utils/theme"
import styled from "@emotion/styled"
import { Education } from "../../components/aboutpage/Education"
import { ExecutiveRecords } from "../../components/aboutpage/ExecutiveRecords"
import { Activities } from "../../components/aboutpage/Activities"
import { AwardsAndHonors } from "../../components/aboutpage/AwardsAndHonors"

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
              <Education />
            </PageContainer>
            <PageContainer color={theme.colors.white}>
              <Activities />
            </PageContainer>
            <PageContainer color={theme.colors.gray}>
              <ExecutiveRecords />
            </PageContainer>
            <PageContainer color={theme.colors.white}>
              <AwardsAndHonors />
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

const Ol = styled.ol`
  width: 100%;
`
