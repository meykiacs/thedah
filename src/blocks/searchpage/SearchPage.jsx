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
import { SearchResults } from "./SearchResults"

export function SearchPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()
  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Wrapper>
              <Header />
              <IntroPageContainer color={theme.colors.white}>
                <SearchResults />
              </IntroPageContainer>
              <Footer />
              <SubFooter />
            </Wrapper>
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const IntroPageContainer = styled(PageContainer)`
  margin-top: 90px;
  ${mq("xl")} {
    align-items: stretch;
    flex-direction: row;
    gap: 32px;
    padding-left: 130px;
    padding-right: 130px;
  }
  margin-bottom: auto;
`


const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;

`