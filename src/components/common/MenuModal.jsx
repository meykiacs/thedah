import { Portal, Close, Content } from "@radix-ui/react-dialog"
// import SiteLogo from "./SiteLogo"
import styled from "@emotion/styled"
import UnstyledButton from "./UnstyledButton"
import { useTranslation } from "react-i18next"
import VisuallyHidden from "./VisuallyHidden"
import { keyframes } from "@emotion/react"
import { IconX } from "@tabler/icons-react"
import useWPContext from "../../context/useWPContext"
import useResourceContext from "../../context/useResourceContext"

export default function MenuModal() {
  const { t } = useTranslation()
  const { homeUrl } = useWPContext()
  const { resourceName } = useResourceContext()

  return (
    <Portal>
      {/* <MenuOverlay /> */}
      <MenuContent aria-label="Menu">
        <InnerWrapper>
          <Close asChild>
            <CloseButton>
              <IconX color="white" />
              <VisuallyHidden>Dismiss menu</VisuallyHidden>
            </CloseButton>
          </Close>
          <Filler />
          <Nav>
            <NavLink
              href={`${homeUrl}`}
              className={resourceName === "home" && "current-page"}
            >
              {t("Home")}
            </NavLink>
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
            <NavLink href={`${homeUrl}course`}>
              {t("Courses")}
            </NavLink>
            <NavLink
              href={`${homeUrl}about`}
              className={resourceName === "about" && "current-page"}
            >
              {t("About")}
            </NavLink>
            <NavLink href={`${homeUrl}contact`}>
              {t("Contact")}
            </NavLink>
          </Nav>
          <Footer>
            <SubLink href={`${homeUrl}contact`}>
              {t("Contact")}
            </SubLink>
          </Footer>
        </InnerWrapper>
      </MenuContent>
    </Portal>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`

const MenuContent = styled(Content)`
  --overfill: 16px;
  position: fixed;
  background-color: ${(p) => p.theme.colors.backdrop};
  width: calc(300px + var(--overfill));
  height: 100%;
  margin-right: calc(var(--overfill) * -1);
  padding: 24px 32px;
  top: 0;
  left: 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
    animation-delay: 200ms;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: ${fadeIn} 600ms both;
  animation-delay: 400ms;
`

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 50px;
  right: var(--overfill);
  padding: 16px;
`

const Filler = styled.div`
  flex: 1;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const NavLink = styled.a`
  color: ${(p) => p.theme.colors.gray};
  font-weight: 400;
  text-decoration: none;
  font-size: 1.8rem;
  text-transform: uppercase;

  &.current-page {
    color: ${(p) => p.theme.colors.secondary};
  }
`

const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`

const SubLink = styled.a`
  color: ${(p) => p.theme.colors.gray};
  font-size: 1.4rem;
  text-decoration: none;
`
