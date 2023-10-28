import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import PaperBanner from "../../components/paperpage/PaperBanner"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"
import { RecentPapersSection } from "../../components/paperpage/RecentPapersSection"
import { PaperArchiveSection } from "../../components/paperpage/PaperArchiveSection"
import { useTitleAndMeta } from "../../hooks/useTitleAndMeta"

export function PaperPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()
  useTitleAndMeta(providedValues.title, providedValues.description)

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <PaperBanner />
            <PageContainer color={theme.colors.gray}>
              <RecentPapersSection />
            </PageContainer>
            <PageContainer color={theme.colors.white}>
              <PaperArchiveSection />
            </PageContainer>
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
