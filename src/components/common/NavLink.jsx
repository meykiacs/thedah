import styled from "@emotion/styled"

const NavLink = ({ children, href, className }) => {
  return (
    <A href={href} className={className}>
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
    border-top: 5px solid ${(p) => p.theme.colors.accent};

    background: linear-gradient(
      180deg,
      ${p => p.theme.colors.gray}
        ${p => p.theme.colors.white}
    );
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      border-top: 5px solid ${(p) => p.theme.colors.accent};

      transition: all 100ms;
      background: linear-gradient(
        180deg,
        ${p => p.theme.colors.gray}
        ${p => p.theme.colors.white}

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
