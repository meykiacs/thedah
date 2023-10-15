import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"

export const BlogPageTitle = () => {
  const { postTitle } = useWPContext()
  return <H1>{postTitle}</H1>
}

const H1 = styled.h1`
  text-align: center;
  margin-top: 90px;
  color: ${(p) => p.theme.colors.primary};
  font-size: 2.4rem;
  font-weight: 700;
`
