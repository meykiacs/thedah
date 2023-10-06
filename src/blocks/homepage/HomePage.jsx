import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import "../../utils/i18n"
import { mq } from "../../utils/mq"
import { HomeCarousel } from "../../components/homepage/HomeCarousel"
import styled from "@emotion/styled"
import { Introduction } from "../../components/homepage/Introduction"
import PageContainer from "../../components/common/PageContainer"
import { HomeBookSection } from "../../components/homepage/HomeBookSection"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { RecentPosts } from "../../components/homepage/RecentPosts"
import { HomePaperSection } from "../../components/homepage/HomePaperSection"

export default function HomePage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <StyledHomeCarousel />
            <PageContainer color={theme.colors.white}>
              <Introduction />
            </PageContainer>
            <HomeBookSection />
            <RecentPosts />
            <HomePaperSection />
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const StyledHomeCarousel = styled(HomeCarousel)`
  display: none;

  ${mq("md")} {
    display: block;
  }
`
