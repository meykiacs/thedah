import styled from "@emotion/styled"

export const Section = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.section`
  padding: 40px 0;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
