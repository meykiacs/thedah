import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import { Activities, AwardsAndHonors, Education, ExecutiveRecords } from "../../components/aboutpage/WithResourceList"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import AboutBanner from "../../components/paperpage/AboutBanner"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"

export default function AboutPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()

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
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
