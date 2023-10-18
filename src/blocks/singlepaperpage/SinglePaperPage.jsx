import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"
import PageContainer from "../../components/common/PageContainer"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import { SinglePaperImages } from "./SinglePaperImages"
import { SinglePaperContent } from "./SinglePaperContent"
import { SinglePaperInfo } from "./SinglePaperInfo"

export function SinglePaperPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()
  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <StyledPageContainer color={theme.colors.white}>
              <SinglePaperInfo />
              <SinglePaperImages />
            </StyledPageContainer>
            <IntroPageContainer color={theme.colors.white}>
              <SinglePaperContent />
            </IntroPageContainer>
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const StyledPageContainer = styled(PageContainer)`
  margin-top: 90px;
  gap: 64px;
  flex-direction: column-reverse;
  ${mq("xl")} {
    align-items: stretch;
    flex-direction: row;
    gap: 32px;
    padding-left: 130px;
    padding-right: 130px;
  }

  ${mq("xxl")} {
    gap: 64px;
  }
`

const IntroPageContainer = styled(PageContainer)`
  border-bottom: solid 2px ${(p) => p.theme.colors.gray};
  margin-top: 90px;
  ${mq("xl")} {
    align-items: stretch;
    flex-direction: row;
    gap: 32px;
    padding-left: 130px;
    padding-right: 130px;
  }
`
