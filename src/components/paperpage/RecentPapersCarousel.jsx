import styled from "@emotion/styled"
import { useState } from "@wordpress/element"
import SVG from "react-inlinesvg"
import useResourceList from "../../hooks/useResourceList"
import left from "../../icons/arrow-left.svg"
import right from "../../icons/arrow-right.svg"
import UnstyledButton from "../common/UnstyledButton"
import { PaperCarouselCard } from "./PaperCarouselCard"
import { mq } from "../../utils/mq"

export const RecentPapersCarousel = () => {
  const papers = useResourceList("paper")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [, setDirection] = useState("")

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % papers.length)
    setDirection("next")
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + papers.length) % papers.length)
    setDirection("prev")
  }

  return (
    <Wrapper>
      <PrevArrow onClick={handlePrev} />
      {papers.length > 0 && <PaperCarouselCard r={papers[currentIndex]} />}
      <NextArrow onClick={handleNext} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .slide-next-enter {
    position: absolute;
    transform: translateX(100%);
  }

  & .slide-next-enter-active {
    position: absolute;
    transform: translateX(0);
    transition: transform 500ms ease-in-out;
  }

  & .slide-next-exit {
    transform: translateX(0);
  }

  & .slide-next-exit-active {
    transform: translateX(-100%);
    transition: transform 500ms ease-in-out;
  }

  & .slide-prev-enter {
    position: absolute;
    transform: translateX(-100%);
  }

  & .slide-prev-enter-active {
    position: absolute;
    transform: translateX(0);
    transition: transform 500ms ease-in-out;
  }

  & .slide-prev-exit {
    transform: translateX(0);
  }

  & .slide-prev-exit-active {
    transform: translateX(100%);
    transition: transform 500ms ease-in-out;
  }
`

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

const ArrowLeft = styled(UnstyledButton)`
  position: absolute;
  z-index: 10;
  
  bottom: 50%;
  right: ${(p) => (p.theme.direction === "ltr" ? "" : "-10px")};
  left: ${(p) => (p.theme.direction === "ltr" ? "-10px" : "")};
  
  ${mq('sm')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "-32px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "-32pxpx" : "")};
  }
  ${mq('md')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "-64px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "-64px" : "")};
  }
  ${mq('lg')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "-10px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "-10px" : "")};
  }
  ${mq('xl')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "" : "-64px")};
    left: ${(p) => (p.theme.direction === "ltr" ? "-64" : "")};
  }
`

const ArrowRight = styled(UnstyledButton)`
  position: absolute;
  z-index: 10;
  
  bottom: 50%;
  right: ${(p) => (p.theme.direction === "ltr" ? "-10px" : "")};
  left: ${(p) => (p.theme.direction === "ltr" ? "" : "-10px")};


  ${mq('sm')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "-32px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "-32px")};
  }
  ${mq('md')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "-64px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "-64px")};
  }
  ${mq('lg')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "-10px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "-10px")};
  }
  ${mq('xl')} {
    right: ${(p) => (p.theme.direction === "ltr" ? "-64px" : "")};
    left: ${(p) => (p.theme.direction === "ltr" ? "" : "-64px")};
  }
`
