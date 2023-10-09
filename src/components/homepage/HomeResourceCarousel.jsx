import Slider from "react-slick"
import styled from "@emotion/styled"
import { SlickSliderWrapper } from "./SlickSliderWrapper"
import UnstyledButton from "../common/UnstyledButton"
import SVG from "react-inlinesvg"
import right from "../../icons/arrow-right.svg"
import left from "../../icons/arrow-left.svg"
import useResourceList from "../../hooks/useResourceList"
import { breakpoints, mq } from "../../utils/mq"

export const HomeResourceCarousel = ({
  resource,
  CarouselCard,
  density,
  ...delegated
}) => {
  const rs = useResourceList(resource)
  const NextArrow = ({ onClick }) => {
    return (
      <ArrowRight onClick={onClick}>
        <SVG src={right} />
      </ArrowRight>
    )
  }
  const PrevArrow = ({ onClick }) => {
    return (
      <ArrowLeft onClick={onClick}>
        <SVG src={left} />
      </ArrowLeft>
    )
  }

  const settings = {
    dots: false,
    lazyload: false,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: density === "medium" ? 5 : density === "high" ? 6 : 1,
    centerMode: true,
    centerPaddig: 0,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: breakpoints.xl,
        settings: {
          slidesToShow: density === "medium" ? 4 : density === "high" ? 5 : 1,
        },
      },
      {
        breakpoint: breakpoints.lg,
        settings: {
          slidesToShow: density === "medium" ? 2 : density === "high" ? 3 : 1,
        },
      },
      {
        breakpoint: breakpoints.md,
        settings: {
          slidesToShow: density === "medium" ? 1 : density === "high" ? 2 : 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  }

  return (
    <Wrapper {...delegated}>
      <SlickSliderWrapper>
        <Slider {...settings}>
          {rs.map((r) => (
            <CarouselCard key={r.id} r={r} />
          ))}
        </Slider>
      </SlickSliderWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: clamp(300px, 100%, 1366px);
  position: relative;
  overflow: hidden;

  ${mq("md")} {
    &:before,
    &:after {
      content: " ";
      position: absolute;
      top: 0;
      width: 250px;
      height: 100%;
      pointer-events: none;
    }

    &.has-gradient:before {
      background: linear-gradient(
        ${(p) => (p.theme.direction === "ltr" ? "90deg" : "270deg")},
        #e7e3cf 0%,
        rgba(231, 227, 207, 0) 100%
      );
      z-index: 15;
    }

    &.has-gradient:after {
      right: 0;
      background: linear-gradient(
        ${(p) => (p.theme.direction === "ltr" ? "270deg" : "90deg")},
        #e7e3cf 0%,
        rgba(231, 227, 207, 0) 100%
      );
      z-index: 15;
    }
  }
`

const ArrowRight = styled(UnstyledButton)`
  position: absolute;
  bottom: 100px;

  right: ${(p) => (p.theme.direction === "ltr" ? "32px" : "")};
  left: ${(p) => (p.theme.direction === "ltr" ? "" : "32px")};

  ${mq("md")} {
    right: ${(p) => (p.theme.direction === "ltr" ? "50px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "50px")};
  }

  ${mq("lg")} {
    right: ${(p) => (p.theme.direction === "ltr" ? "90px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "90px")};
  }
  z-index: 10;
`

const ArrowLeft = styled(UnstyledButton)`
  position: absolute;
  bottom: 100px;
  right: ${(p) => (p.theme.direction === "ltr" ? "" : "32px")};
  left: ${(p) => (p.theme.direction === "ltr" ? "32px" : "")};
  ${mq("md")} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "50px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "50px" : "")};
  }
  ${mq("lg")} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "90px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "90px" : "")};
  }
  z-index: 10;
`
