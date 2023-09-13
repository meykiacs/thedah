import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import { BooksProvider } from "../../context/BooksContext"
import { WPProvider } from "../../context/WPContext"
import useLanguageContext from "../../context/useLanguageContext"
import { useTranslation } from "react-i18next"
import ToggleColorScheme from "../../components/common/ToggleColorScheme"
import ToggleLanguage from "../../components/common/ToggleLanguage"
import { useColorSchemeContext } from "../../context/useColorSchemeContext"
import "../../utils/i18n"
import { breakpoints } from "../../utils/mq"
import { RtlProvider } from "../../context/RtlProvider"
import { lightTheme, darkTheme } from "../../utils/theme"
import Header from "../../components/common/Header"

export default function BookPage({ providedValues }) {
  const { t } = useTranslation()
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

            <ToggleLanguage />
            <ToggleColorScheme />
            <p>{t("Dashboard")}</p>
          </BooksProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
