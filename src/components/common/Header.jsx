import styled from "@emotion/styled"
import SuperBar from "./SuperBar"
import { mq } from "../../utils/mq"
import SiteLogo from "./SiteLogo"
import NavLink from "./NavLink"
import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"

export default function Header() {
  const { homeUrl } = useWPContext()
  const { t } = useTranslation()
  return (
    <header>
      <SuperBar />
      <MainHeader>
        <LogoWrapper>
          <SiteLogo />
        </LogoWrapper>
        <DesktopNav>
          <NavLink href={homeUrl}>{t("Home")}</NavLink>
          <NavLink href={`${homeUrl}/book`}>{t('Books')}</NavLink>
          <NavLink href={`${homeUrl}/gallery`}>{t('Gallery')}</NavLink>
          <NavLink href={`${homeUrl}/paper`}>{t('Papers')}</NavLink>
          <NavLink href={`${homeUrl}/course`}>{t('Courses')}</NavLink>
          <NavLink href={`${homeUrl}/about`}>{t('About Me')}</NavLink>
          <NavLink href={`${homeUrl}/contact`}>{t('Contact Me')}</NavLink>
        </DesktopNav>
      </MainHeader>
    </header>
  )
}

const MainHeader = styled.div`
  display: flex;
  padding-left: 18px 16px;
  padding-right: 18px 16px;
  ${mq("sm")} {
    padding-left: 32px;
    padding-right: 32px;
  }
  ${mq("lg")} {
    padding-left: 95px;
    padding-right: 95px;
  }

  align-items: stretch;
`

const LogoWrapper = styled.div`
  margin-top: 5px;
`

const DesktopNav = styled.nav`
  align-items: center;
  margin-left: 70px;
  ${mq("md")} {
    display: flex;
    gap: clamp(1.6rem, 9.2vw - 7.2rem, 5.6rem);
  }
`
