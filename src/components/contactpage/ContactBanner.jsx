import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import useWPContext from "../../context/useWPContext"
import { SocialList } from "./SocialList"

export default function ContactBanner() {
  const { assetsImagesUrl } = useWPContext()
  return (
    <Wrapper>
      <ImageWrapper>
        <img
          src={`${assetsImagesUrl}/banner-contact.png`}
          alt="banner about page"
        />
      </ImageWrapper>
      <SocialWrapper>
        <SocialList />
      </SocialWrapper>
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

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: clamp(300px, 90%, 500px);

  ${mq("md")} {
    transform: scale(80%) translateY(15px);
  }

  ${mq("lg")} {
    transform: translateY(15px);
  }
`
