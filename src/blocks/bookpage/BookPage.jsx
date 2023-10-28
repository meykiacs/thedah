import { ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import GlobalCss from "../../components/GlobalCss"
import BookBanner from "../../components/bookpage/BookBanner"
import BookList from "../../components/bookpage/BookList"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import { BooksProvider } from "../../context/BooksContext"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"
import { useTitleAndMeta } from "../../hooks/useTitleAndMeta"

export function BookPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()
  useTitleAndMeta(providedValues.title, providedValues.description)

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <BooksProvider providedValues={providedValues}>
            <ResourceProvider providedValues={providedValues}>
              <GlobalCss />
              <Header />
              <BookBanner />
              <BookListContainer color={theme.colors.gray}>
                <BookList />
              </BookListContainer>
              <Footer />
              <SubFooter />
            </ResourceProvider>
          </BooksProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}

const BookListContainer = styled(PageContainer)`
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`
