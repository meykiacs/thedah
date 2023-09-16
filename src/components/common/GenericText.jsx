import styled from "@emotion/styled"

export default function GenericText({ children, ...delegated }) {
  return <P {...delegated}>{children}</P>
}

const P = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
`