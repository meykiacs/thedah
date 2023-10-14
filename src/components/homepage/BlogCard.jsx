import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { ButtonV2 } from "../common/ButtonV2"
import { useTheme } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { mq } from "../../utils/mq"

export function BlogCard({ post }) {
  const { assetsImagesUrl } = useWPContext()
  const theme = useTheme()
  const {t} = useTranslation()
  let prefix
  let buttonText
  let imageUrl
  if (post.type.startsWith("thedah_course")) {
    prefix = "Course"
    buttonText = "Enroll"
    imageUrl = `${assetsImagesUrl}/course-thumbnail.png`
  } else if (post.type.startsWith("thedah_blog")) {
    buttonText = post.meta._thedah_blog.feature
    buttonText = buttonText === "none" ? "More" : buttonText
    buttonText = buttonText === "enroll" ? "Enroll" : buttonText
    buttonText = buttonText === "purchase" ? "Purchase" : buttonText
    buttonText = buttonText === "prepurchase" ? "PrePurchase" : buttonText
    imageUrl = post.meta._thedah_images[0].thumbnailUrl
    imageUrl = imageUrl === '' ? post.meta._thedah_images[0].source_url : imageUrl
    imageUrl = imageUrl === '' ? `${assetsImagesUrl}/course-thumbnail.png`: imageUrl
    switch (post.meta._thedah_blog.blogtype) {
      case "interview":
        prefix = "Interview"
        break
      case "event":
        prefix = "Soon"
        break
      default:
        prefix = "More"
        break
    }
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <img
          src={imageUrl}
          alt={post.title}
        />
      </ImageWrapper>
      <Title>{`${t(prefix)}: ${post.title}`}</Title>
      <StyledButtonV2
        variant="fill"
        br="7px"
        h="50px"
        w="150px"
        fz="1.5rem"
        fw={500}
        color={theme.colors.secondary}
        colorHover={theme.colors.secondary}
      >
        {t(buttonText)}
      </StyledButtonV2>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  box-shadow: 0px 0px 7px 0px rgba(35, 30, 26, 0.2);
  padding: 32px;
  border-radius: 7px;

  ${mq('lg')} {
    flex-direction: row;
    gap: 50px;
    justify-content: space-between;
    height: 100px;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    width: clamp(740px,90%,1000px);
  }
`
const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  box-shadow: 0px 2px 4px 0px rgba(35, 30, 26, 0.4);
  img {
    width: 100%;
    height: 100%;
  }
  overflow: hidden;
`

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 3;
`

const StyledButtonV2 = styled(ButtonV2)`
  margin-left: auto;
`