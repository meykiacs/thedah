import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { Section } from "../common/Section"

export const HomeBookSection = () => {
  const {assetsImagesUrl} = useWPContext()
  return (
    <StyledSection>
      <BookLogoWrapper>
        <img src={`${assetsImagesUrl}/home-booksection-image.png`} alt="book logo" />
      </BookLogoWrapper>
      
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  background-color: ${p => p.theme.colors.gray};
  gap: 30px;
`

const BookLogoWrapper = styled.div`
  width: 328px;
  height: 250px;
  > img {
    width: 100%;
    height: 100%;
  }
`