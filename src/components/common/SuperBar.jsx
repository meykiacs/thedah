import styled from "@emotion/styled"
import ToggleLanguage from "./ToggleLanguage"

export default function SuperBar() {
  return (
    <Wrapper>
      <ToggleLanguage />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-left: 40px;
  background-color: ${(p) => p.theme.colors.black};
  height: 25px;
`
