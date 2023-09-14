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
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: flex-end;
  background-color: ${(p) => p.theme.colors.black};
  height: 25px;
`
