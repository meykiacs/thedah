import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import SoicialIcons from "./SoicialIcons"
import Rights from "./Rights"

export default function SubFooter() {
  return (
    <Wrapper>
      <SoicialIcons />
      <Rights />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: flex-end;
  background-color: ${(p) => p.theme.colors.black};
  height: 65px;
  justify-content: space-between;
  align-items: center;

  flex-direction: column;

  padding-left: 16px;
  padding-right: 16px;

  ${mq("sm")} {
    padding-left: 32px;
    padding-right: 32px;
    flex-direction: row-reverse;
  }
  ${mq("lg")} {
    padding-left: 95px;
    padding-right: 95px;
  }
`
