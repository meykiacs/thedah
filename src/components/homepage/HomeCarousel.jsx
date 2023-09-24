import Slider from "react-slick"

import img1 from "../../../assets/images/home-carousel-image-1.png"
import img2 from "../../../assets/images/home-carousel-image-2.png"
import img3 from "../../../assets/images/home-carousel-image-3.png"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import { SlickSliderWrapper } from "./SlickSliderWrapper"
import { useState } from "@wordpress/element"
import { useTheme } from "@emotion/react"
export const HomeCarousel = () => {
  const images = [img1, img2, img3]
  const [imageIndex, setImageIndex] = useState(0)
  const theme = useTheme()
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => setImageIndex(next)
  }

  return (
    <Wrapper>
      <SlickSliderWrapper>
        <Slider {...settings}>
          {images.map((image, index) => (
            <ImageWrapper key={index}>
              <img src={image} alt={image} />
            </ImageWrapper>
          ))}
        </Slider>
      </SlickSliderWrapper>
      <Dots>
        {images.map((image, index) => <Circle key={index}
            color={imageIndex === index ? theme.colors.accent : theme.colors.primary} />
         )}
      </Dots>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  ${mq("xl")} {
    margin: 0 auto;
    max-width: 1366px;
  }
`
const ImageWrapper = styled.div`
  width: 100%;
  & > img {
    width: 100%;
  }
`

const Dots = styled.ul`
  display: flex;
  bottom: 30px;
  /* align-items: center; */
  justify-content: center;
  transform: translateY(-40px);
  gap: 12px;
`
const Circle = styled.div`
  border-radius: 100px;
  background-color: ${p => p.color};
  width: 32px;
  height: 32px;
`
