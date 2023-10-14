import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { Section } from "../common/Section"
import { HomeResourceCarousel } from "./HomeResourceCarousel"
import { GalleryCarouselCard } from "./GalleryCarouselCard"

export const HomeGallerySection = () => {
  const { assetsImagesUrl } = useWPContext()
  return (
    <StyledSection>
      <GalleryLogoWrapper>
        <img
          src={`${assetsImagesUrl}/home-gallery-logo.png`}
          alt="gallery logo"
        />
      </GalleryLogoWrapper>
      <HomeResourceCarousel
        resource="gallery"
        CarouselCard={GalleryCarouselCard}
        density="medium"
        className='has-gradient'
      />
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  background-color: ${(p) => p.theme.colors.gray};
  gap: 30px;
`

const GalleryLogoWrapper = styled.div`
  width: 500px;
  height: 216px;
  > img {
    width: 100%;
    height: 100%;
  }
`
