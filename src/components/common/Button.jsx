import styled from "@emotion/styled"


const Button = ({
  variant,
  color,
  colorHover,
  br,
  fz,
  p,
  fw,
  children,
  type,
  ...delegated
}) => {
  let Component
  if (variant === "fill") {
    Component = FillButton
  } else if (variant === "outline") {
    Component = OutlineButton
  } else if (variant === "ghost") {
    Component = GhostButton
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`)
  }

  return (
    <Component
      br={br}
      fz={fz}
      p={p}
      color={color}
      colorHover={colorHover}
      fw={fw}
      {...delegated}
      type={type}
    >
      {children}
    </Component>
  )
}

const ButtonBase = styled.button`
  font-size: ${(p) => p.fz};
  font-weight: ${(p) => p.fw};

  padding: ${(p) => p.p};
  border-radius: ${(p) => p.br};
  border: 2px solid transparent;

  &:focus {
    outline-color: ${(p) => p.color};
    outline-offset: 4px;
  }
`

const FillButton = styled(ButtonBase)`
  background-color: ${(p) => p.color};
  color: #fff;

  &:hover {
    background-color: ${(p) => p.colorHover};
  }
`

const OutlineButton = styled(ButtonBase)`
  background-color: ${(p) => p.theme.colors.white};
  color: ${(p) => p.color};
  border: 2px solid currentColor;

  &:hover {
    background-color: ${(p) => p.theme.colors.black};
  }
`

const GhostButton = styled(ButtonBase)`
  color: ${(p) => p.theme.colors.gray};
  background-color: transparent;

  &:focus {
    outline-color: ${(p) => p.theme.colors.gray};
  }

  &:hover {
    background: ${(p) => p.theme.colors.black};
    color: ${(p) => p.theme.colors.black};
  }
`

export default Button
