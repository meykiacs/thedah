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
import { BlogPageTitle } from "../../components/blogpage/BlogPageTitle"
import { BlogImages } from "../../components/blogpage/BlogImages"
import { BlogContent } from "../../components/blogpage/BlogContent"
import { BlogMetaData } from "../../components/blogpage/BlogMetaData"
import { Comment } from "../../components/comments/Comment"
import styled from "@emotion/styled"
import { CommentProvider } from "../../context/CommentContext"

export function BlogPage({ providedValues }) {
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
              <BlogPageTitle />
              <BlogImages />
              <BlogContent />
              <BlogMetaData />
            </StyledPageContainer>
            <StyledPageContainer color={theme.colors.white}>
              <CommentProvider>
                <Comment />
              </CommentProvider>
            </StyledPageContainer>
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const StyledPageContainer = styled(PageContainer)`
  border-bottom: solid 2px ${(p) => p.theme.colors.gray};
`
