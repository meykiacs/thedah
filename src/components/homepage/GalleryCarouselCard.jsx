import styled from "@emotion/styled"

export const GalleryCarouselCard = ({ r }) => {

  const image = r.meta._thedah_images[0]
  const imageUrl = image.mediumUrl ? image.mediumUrl : image.source_url
  return (
      <ImageWrapper>
          <img src={imageUrl} alt={r.title} />
      </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  height: 250px;
  width: 250px;
  & > img {
    width: 100%;
    height: 100%;
  }
`

