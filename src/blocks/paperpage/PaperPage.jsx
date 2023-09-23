import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import "../../utils/i18n"
import i18n from "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { RtlProvider } from "../../context/RtlProvider"
import { lightTheme, darkTheme } from "../../utils/theme"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import Footer from "../../components/common/Footer"
import styled from "@emotion/styled"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import PaperBanner from "../../components/paperpage/PaperBanner"
import ResourceList from "../../components/common/ResourceList"

export default function PaperPage({ providedValues }) {
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
            <PaperBanner />
            <PaperListContainer color={theme.colors.white}>
              <ResourceList />
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
