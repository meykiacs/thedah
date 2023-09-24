import Slider from "react-slick"

import img1 from "../../../assets/images/home-carousel-image-1.png"
import img2 from "../../../assets/images/home-carousel-image-2.png"
import img3 from "../../../assets/images/home-carousel-image-3.png"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import { SlickSliderWrapper } from "./SlickSliderWrapper"
import { useState } from "@wordpress/element"
import { useTheme } from "@emotion/react"
import useWPContext from "../../context/useWPContext"
import Button from "../common/Button"
import { useTranslation } from "react-i18next"
export const HomeCarousel = ({ className }) => {
  const images = [img1, img2, img3]
  const [imageIndex, setImageIndex] = useState(0)
  const theme = useTheme()
  const { homeUrl } = useWPContext()
  const { t } = useTranslation()
  const buttons = [
    { label: "enrollInCourses", href: `${homeUrl}course` },
    { label: "buyBooks", href: `${homeUrl}book` },
    { label: "watch", href: `${homeUrl}` },
  ]
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
    beforeChange: (current, next) => setImageIndex(next),
  }

  return (
    <Wrapper className={className}>
      <SlickSliderWrapper>
        <Slider {...settings}>
          {images.map((image, index) => (
            <>
              <ImageWrapper key={index}>
                <img src={image} alt={image} />
              </ImageWrapper>
              <StyledButton
                key={buttons[index].label}
                variant="fill"
                color={theme.colors.accent}
                colorHover={theme.colors.accent}
                br="7px"
                fz="15px"
                fw={500}
                p="10px 42px"
                as='a'
                href={buttons[index].href}
              >
                {t(buttons[index].label)}
              </StyledButton>
            </>
          ))}
        </Slider>
      </SlickSliderWrapper>
      <Dots>
        {images.map((image, index) => (
          <Circle
            key={index}
            color={
              imageIndex === index ? theme.colors.accent : theme.colors.primary
            }
          />
        ))}
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

const StyledButton = styled(Button)`
  display: none;
  text-decoration: none;
  ${mq("md")} {
    display: inline-block;
    transform: translate(375px, -115px);
  }

  ${mq("lg")} {
    transform: translate(425px, -145px);
  }
  ${mq("xl")} {
    transform: translate(500px, -180px);
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
  background-color: ${(p) => p.color};
  width: 16px;
  height: 16px;
  ${mq("lg")} {
    width: 24px;
    height: 24px;
  }
  ${mq("xl")} {
    width: 32px;
    height: 32px;
  }
`
