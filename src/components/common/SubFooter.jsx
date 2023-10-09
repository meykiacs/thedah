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
  justify-content: flex-end;
  background-color: ${(p) => p.theme.colors.black};
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  flex-direction: column;

  padding: 16px 16px;

  ${mq("md")} {
    padding: 0 32px;
    flex-direction: row-reverse;
    height: 65px;
    gap: unset;
  }
  ${mq("lg")} {
    padding: 0 95px;
  }
`
