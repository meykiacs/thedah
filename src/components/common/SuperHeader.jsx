import styled from "@emotion/styled"
import ToggleLanguage from "./ToggleLanguage"
import { mq } from "../../utils/mq"
import ToggleColorScheme from "./ToggleColorScheme"

export default function SuperHeader() {
  return (
    <Wrapper>
      <ToggleColorScheme />
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
  gap: 48px;

  padding-left: 16px;
  padding-right: 16px;

  ${mq("sm")} {
    padding-left: 32px;
    padding-right: 32px;
  }
  ${mq("lg")} {
    padding-left: 95px;
    padding-right: 95px;
  }

`
