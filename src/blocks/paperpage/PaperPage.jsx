import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
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
import { PaperList } from "../../components/paperpage/PaperList"

export function PaperPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <PaperBanner />
            <PaperListContainer color={theme.colors.white}>
              <PaperList />
            </PaperListContainer>
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const PaperListContainer = styled(PageContainer)`
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`
