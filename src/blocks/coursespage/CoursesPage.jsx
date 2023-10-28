import { ThemeProvider } from "@emotion/react"
import GlobalCss from "../../components/GlobalCss"
import Footer from "../../components/common/Footer"
import Header from "../../components/common/Header"
import PageContainer from "../../components/common/PageContainer"
import SubFooter from "../../components/common/SubFooter"
import { ResourceProvider } from "../../context/ResourceContext"
import { RtlProvider } from "../../context/RtlProvider"
import { WPProvider } from "../../context/WPContext"
import { useCustomTheme } from "../../hooks/useCustomTheme"
import { useLanguageAndDirection } from "../../hooks/useLangugaAndDirection"
import "../../utils/i18n"
import CoursesBanner from "./CoursesBanner"
import { RecentCoursesSection } from "./RecentCoursesSection"
import { CoursesArchiveSection } from "./CoursesArchiveSection"
import { useTitleAndMeta } from "../../hooks/useTitleAndMeta"

export function CoursesPage({ providedValues }) {
  useLanguageAndDirection()
  const theme = useCustomTheme()
  useTitleAndMeta(providedValues.title, providedValues.description)

  return (
    <RtlProvider>
      <ThemeProvider theme={theme}>
        <WPProvider providedValues={providedValues}>
          <ResourceProvider providedValues={providedValues}>
            <GlobalCss />
            <Header />
            <CoursesBanner />
            <PageContainer color={theme.colors.gray}>
              <RecentCoursesSection />
            </PageContainer>
            <PageContainer color={theme.colors.white}>
              <CoursesArchiveSection />
            </PageContainer>
            <Footer />
            <SubFooter />
          </ResourceProvider>
        </WPProvider>
      </ThemeProvider>
    </RtlProvider>
  )
}
