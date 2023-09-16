import styled from "@emotion/styled"

export default function Main({ children }) {
  return <M>{children}</M>
}

const M = styled.main`
  background-color: ${(p) => p.theme.colors.gray};
`
