import styled from "@emotion/styled"
import ToggleLanguage from "./ToggleLanguage"
import { mq } from "../../utils/mq"

export default function SuperHeader() {
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
