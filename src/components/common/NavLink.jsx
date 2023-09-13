import styled from "@emotion/styled"

const NavLink = ({ children, href }) => {
  return (
    <A href={href}>
      <Text>{children}</Text>
    </A>
  )
}

const A = styled.a`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.4rem;
  text-decoration: none;
  font-weight: 400;
  color: ${(p) => p.theme.colors.text};
  overflow: hidden;
  border-top: 5px solid transparent;
  
  &.current-page {
    color: ${(p) => p.theme.colors.primary};
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      border-top: 5px solid ${(p) => p.theme.colors.accent};

      transition: all 100ms;
      background: linear-gradient(
        180deg,
        rgba(231, 227, 207, 0.51) 0%,
        rgba(255, 255, 255, 0.25) 100%
      );
    }
  }
`
const Text = styled.span`
  display: block;
  transition: all 500ms;
  min-width: max-content;
`

export default NavLink
