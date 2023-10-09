import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import useWPContext from "../../context/useWPContext"
import useResourceList from "../../hooks/useResourceList"

export default function AboutBanner() {
  const { assetsImagesUrl } = useWPContext()
  const about = useResourceList('about')[0]
  return (
    <Wrapper>
      <ImageWrapper>
        <img
          src={`${assetsImagesUrl}/banner-about.png`}
          alt="banner about page"
        />
      </ImageWrapper>
      <AboutWrapper>
        <BannerLogo>
          <img src={`${assetsImagesUrl}/banner-logo.png`} alt="banner logo" />
        </BannerLogo>
        <Rank>{about?.meta?._thedah_about?.academicRank}</Rank>
      </AboutWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  ${mq("md")} {
    flex-direction: row-reverse;
    justify-content: center;
  }

`

const ImageWrapper = styled.div`
  img {
    width: 100%;
  }

  ${mq("md")} {
    width: clamp(300px, 100%, 768px);
  }
`

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: clamp(300px, 90%, 500px);

  gap: 25px;
  ${mq("lg")} {
    gap: 50px;
  }
`

const BannerLogo = styled.div`
  img {
    width: 100%;
  }

  ${mq("md")} {
    width: clamp(300px, 100%, 768px);
  }
`

const Rank = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`
