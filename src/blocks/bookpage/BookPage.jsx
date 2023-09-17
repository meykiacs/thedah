import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import { BooksProvider } from "../../context/BooksContext"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import ToggleColorScheme from "../../components/common/ToggleColorScheme"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { RtlProvider } from "../../context/RtlProvider"
import { lightTheme, darkTheme } from "../../utils/theme"
import Header from "../../components/common/Header"
import BookBanner from "../../components/bookpage/BookBanner"
import PageContainer from "../../components/common/PageContainer"
import BookList from "../../components/bookpage/BookList"
import Footer from "../../components/common/Footer"

export default function BookPage({ providedValues }) {
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
          <BooksProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <PageContainer color={theme.colors.white}>
              <BookBanner />
            </PageContainer>
            <PageContainer color={theme.colors.gray}>
                <BookList />
            </PageContainer>
            <Footer />
            <ToggleColorScheme />
          </BooksProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
