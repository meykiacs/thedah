import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import useLanguageContext from "../../context/useLanguageContext"
import "../../utils/i18n"
import i18n from "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { darkTheme, lightTheme } from "../../utils/theme"
import { HomeCarousel } from "../../components/homepage/HomeCarousel"

export default function HomePage({ providedValues }) {
  const { colorScheme } = useColorSchemeContext()

  const { lang, dir } = useLanguageContext()
  if (lang === "en") {
    i18n.changeLanguage("en")
  }
  if (lang === "fa") {
    i18n.changeLanguage("fa")
  }

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
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <HomeCarousel />
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
