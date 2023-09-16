import styled from "@emotion/styled"
import { mq } from "../../utils/mq"

export default function PageContainer({ children, color }) {
  return <Wrapper color={color}>{children}</Wrapper>
}


const Wrapper = styled.div`
  background-color: ${p => p.color};
  padding: 0 8px;

  ${mq('md')} {
    padding: 0 16px;
  }

  ${mq('lg')} {
    padding: 0 32px;
  }

  ${mq('xl')} {
    padding: 0 50px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

`