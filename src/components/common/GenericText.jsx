import styled from "@emotion/styled"

export default function GenericText({ children }) {
  return <P>{children}</P>
}

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
`