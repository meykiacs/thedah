import styled from "@emotion/styled"
import SuperHeader from "./SuperHeader"
import { mq } from "../../utils/mq"
import SiteLogo from "./SiteLogo"
import NavLink from "./NavLink"
import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import UnstyledButton from "./UnstyledButton"
import Icon from "./Icon"
import VisuallyHidden from "./VisuallyHidden.jsx"
import { Root, Trigger } from "@radix-ui/react-dialog"
import SearchModal from "./SearchModal"
import MenuModal from "./MenuModal"
import useResourceContext from "../../context/useResourceContext"

export default function Header() {
  const { homeUrl } = useWPContext()
  const { t } = useTranslation()
  const { resourceName } = useResourceContext()
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <SiteLogo />
        </LogoWrapper>
        <DesktopNav>
          <NavLink href={homeUrl}>{t("Home")}</NavLink>
          <NavLink
            href={`${homeUrl}book`}
            className={resourceName === "book" && "current-page"}
          >
            {t("Books")}
          </NavLink>
          <NavLink
            href={`${homeUrl}gallery`}
            className={resourceName === "gallery" && "current-page"}
          >
            {t("Gallery")}
          </NavLink>
          <NavLink
            href={`${homeUrl}paper`}
            className={resourceName === "paper" && "current-page"}
          >
            {t("Papers")}
          </NavLink>
          <NavLink href={`${homeUrl}course`}>{t("Courses")}</NavLink>
          <NavLink
            href={`${homeUrl}about`}
            className={resourceName === "about" && "current-page"}
          >
            {t("About")}
          </NavLink>
          <NavLink href={`${homeUrl}contact`}>{t("Contact")}</NavLink>
        </DesktopNav>
        <IconsWrapper>
          <Root>
            <Trigger asChild>
              <UnstyledButton>
                <Icon id="search" />
                <VisuallyHidden>Search</VisuallyHidden>
              </UnstyledButton>
            </Trigger>
            <SearchModal />
          </Root>
          <MobileActions>
            <Root>
              <Trigger asChild>
                <UnstyledButton>
                  <Icon id="menu" />
                  <VisuallyHidden>Open menu</VisuallyHidden>
                </UnstyledButton>
              </Trigger>
              <MenuModal />
            </Root>
          </MobileActions>
        </IconsWrapper>
      </MainHeader>
    </header>
  )
}

const MainHeader = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  align-items: stretch;

  ${mq("sm")} {
    padding-left: 32px;
    padding-right: 32px;
  }
  ${mq("lg")} {
    padding-left: 95px;
    padding-right: 95px;
  }
`

const LogoWrapper = styled.div`
  margin-top: 5px;
`

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  margin-left: 70px;
  ${mq("md")} {
    display: flex;
    gap: clamp(1.6rem, 9.2vw - 7.2rem, 5.6rem);
  }
`

const IconsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

const MobileActions = styled.div`
  gap: 16px;
  display: flex;
  ${mq("sm")} {
    gap: 32px;
  }
  ${mq("md")} {
    display: none;
  }
`
