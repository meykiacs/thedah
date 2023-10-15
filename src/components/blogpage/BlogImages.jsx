import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"

export const BlogImages = () => {
  const { images } = useWPContext()
  return <Wrapper>
    {images.map((i, index) => <ImageWrapper key={i.id}>
      <img src={i.paperLandscapeUrl ? i.paperLandscapeUrl : i.fullUrl } alt={`feature-${index}`} />
    </ImageWrapper>)}
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 40px auto;
`

const ImageWrapper = styled.div`
  width: 390px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
`
