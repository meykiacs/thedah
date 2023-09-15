import styled from "@emotion/styled"
import { mq } from "../../utils/mq"

export default function PageContainer({ children }) {
  return <Wrapper>{children}</Wrapper>
}


const Wrapper = styled.div`
  padding: 0 8px;

  ${mq('md')} {
    padding: 0 32px;
  }

  ${mq('xl')} {
    padding: 0 64px;
  }

  max-width: 1500px;
  margin-right: auto;
  margin-left: auto;
`