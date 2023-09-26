import Slider from "react-slick"
import styled from "@emotion/styled"
import { SlickSliderWrapper } from "./SlickSliderWrapper"
import UnstyledButton from "../common/UnstyledButton"
import SVG from "react-inlinesvg"
import right from "../../icons/arrow-right.svg"
import left from "../../icons/arrow-left.svg"
import useResourceList from "../../hooks/useResourceList"
import { HomeBookCard } from "./HomeBookCard"
import { breakpoints, mq } from "../../utils/mq"

export const HomeBookCarousel = ({ ...delegated }) => {
  const books = useResourceList("book")

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
    lazyload: true,
    autoplay: false,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 6,
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: breakpoints.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: breakpoints.md,
        settings: {
          slidesToShow: 2,
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
          {books.map((b) => (
            <HomeBookCard key={b.title} b={b} />
          ))}
        </Slider>
      </SlickSliderWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* box-sizing: border-box; */
  width: clamp(300px, 100%, 1366px);
  height: 262px;
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

    &:before {
      background: linear-gradient(
        ${p => p.theme.direction === 'ltr' ? '90deg' : '270deg'},
        #e7e3cf 0%,
        rgba(231, 227, 207, 0) 100%
        );
        z-index: 15;
      }
      
      &:after {
        right: 0;
        background: linear-gradient(
        ${p => p.theme.direction === 'ltr' ? '270deg' : '90deg'},
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
