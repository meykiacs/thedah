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
import { Comment } from "../../components/comments/Comment"
import styled from "@emotion/styled"
import { CommentProvider } from "../../context/CommentContext"
import { VideoPlayer } from "./VideoPlayer"
import { CourseInfo } from "./CourseInfo"
import { mq } from "../../utils/mq"
import { CourseIntroduction } from "./CourseIntroduction"

export function CoursePage({ providedValues }) {
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
              <CourseInfo />
              <VideoPlayer />
            </StyledPageContainer>
            <IntroPageContainer color={theme.colors.white}>
              <CourseIntroduction />
            </IntroPageContainer>
            <PageContainer color={theme.colors.white}>
              <CommentProvider>
                <Comment />
              </CommentProvider>
            </PageContainer>
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
`
