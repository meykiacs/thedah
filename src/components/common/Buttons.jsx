import styled from "@emotion/styled"


const Button = ({
  variant,
  color,
  colorHover,
  borderRadius,
  fontSize,
  paddding,
  children,
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
      br={borderRadius}
      fz={fontSize}
      p={paddding}
      color={color}
      colorHover={colorHover}
      {...delegated}
    >
      {children}
    </Component>
  )
}

const ButtonBase = styled.button`
  font-size: ${(p) => p.fz};
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
