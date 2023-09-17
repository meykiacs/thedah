import styled from "@emotion/styled"
import VisuallyHidden from "./VisuallyHidden"

const Input = ({
  label,
  w = 250,
  fz,
  borderThickness,
  br,
  h,
  type,
  ...delegated
}) => {

  return (
    <Wrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
      <StyledInput
        type={type}
        {...delegated}
        style={{
          "--width": w + "px",
          "--height": h + "px",
          "--border-thickness": borderThickness + "px",
          "--font-size": fz  + "rem",
          "--br": br  + "px",
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.label`
  display: block;
  position: relative;
  color: ${p => p.theme.colors.gray};

  &:hover {
    color: ${p => p.theme.colors.black};
  }
`

const StyledInput = styled.input`
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size);
  border: none;
  border-bottom: var(--border-thickness) solid ${p => p.theme.colors.black};
  padding-left: var(--height);
  color: inherit;
  font-weight: 700;
  outline-offset: 2px;
  border-radius: var(--br);

  &::placeholder {
    font-weight: 400;
    color: ${p => p.theme.colors.gray};
  }
`

export default Input
