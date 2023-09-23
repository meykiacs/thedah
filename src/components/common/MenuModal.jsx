import { Portal, Close, Content, Overlay } from "@radix-ui/react-dialog"
// import SiteLogo from "./SiteLogo"
import styled from "@emotion/styled"
import Icon from "./Icon"
import UnstyledButton from "./UnstyledButton"
import { useTranslation } from "react-i18next"
import VisuallyHidden from "./VisuallyHidden"
import { keyframes } from "@emotion/react"

export default function MenuModal() {
  const { t } = useTranslation()
  return (
    <Portal>
      {/* <MenuOverlay /> */}
      <MenuContent aria-label="Menu">
        <InnerWrapper>
          <Close asChild>
            <Icon id="close" />
            {/* <VisuallyHidden>Dismiss menu</VisuallyHidden> */}
          </Close>
          <Filler />
          <Nav>
            <NavLink href="/sale">Sale</NavLink>
            <NavLink href="/new">New&nbsp;Releases</NavLink>
            <NavLink href="/men">Men</NavLink>
            <NavLink href="/women">Women</NavLink>
            <NavLink href="/kids">Kids</NavLink>
            <NavLink href="/collections">Collections</NavLink>
          </Nav>
          <Footer>
            <SubLink href="/terms">Terms and Conditions</SubLink>
            <SubLink href="/privacy">Privacy Policy</SubLink>
            <SubLink href="/contact">Contact Us</SubLink>
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
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
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
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`

const SearchButton = styled(UnstyledButton)`
  padding-top: 3px;
  padding-left: 7px;
`

const Form = styled.form`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: clamp(300px, 90%, 775px);
`

const Title = styled.h2`
  color: #fff;
  font-size: 2.3rem;
  font-weight: 400;
`

const Input = styled.input`
  border: none;
  background: transparent;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray};
  padding-left: 10px;
  max-width: 775px;
  font-size: 2.3rem;
  color: ${(p) => p.theme.colors.gray};
  outline-offset: 4px;
  width: clamp(300px, 90%, 775px);
  margin-top: 40px;

  &::placeholder {
    color: ${(p) => p.theme.colors.gray};
  }
`
