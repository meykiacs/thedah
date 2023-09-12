import { CacheProvider, ThemeProvider } from "@emotion/react"
import Fonts from "../../components/Fonts"
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

export default function BookPage({ providedValues }) {
  const { t } = useTranslation()
  const { colorScheme } = useColorSchemeContext()

  const { dir } = useLanguageContext()

  const theme = {
    fontFamily: "Vazirmatn, sans-serif",
    direction: dir,
    colors:
      colorScheme === "dark"
        ? {
            background: "#333",
            text: "#FFF",
          }
        : {
            background: "#FFF",
            text: "#333",
          },
    breakpoints,
  }

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <BooksProvider providedValues={providedValues}>
            <Fonts />
            <div
              dir={theme.direction}
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
              }}
            >
              <ToggleLanguage />
              <ToggleColorScheme />
              <p>{t("Dashboard")}</p>
            </div>
          </BooksProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
