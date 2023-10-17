import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import styled from "@emotion/styled"
import { Root, Trigger } from "@radix-ui/react-dialog"
import VideoModal from "../../components/common/VideoModal"

export function CourseCard({ course, color = "gray" }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const imageUrl = `${assetsImagesUrl}/video-card-placeholder.png`
  return (
    <Wrapper color={color}>
      {course.meta._thedah_images[0] ? (
        <Root>
          <Trigger asChild>
            <ImageWrapper pointer>
              <img src={imageUrl} alt={course.title} />
            </ImageWrapper>
          </Trigger>
          <VideoModal video={course.meta._thedah_images[0].source_url} />
        </Root>
      ) : (
        <ImageWrapper>
          <img src={imageUrl} alt={course.title} />
        </ImageWrapper>
      )}

      <CourseInfo>
        <Title>{course.title}</Title>
        <NormalText>
          {t("Instructor")}
          {": "}
          {course.meta._thedah_course.teacher}
          {course.meta._thedah_course.co &&
            course.meta._thedah_course.coTeachers[0] !== "" &&
            course.meta._thedah_course.coTeachers.map((c) => (
              <span key={c}>
                {t("comma")} {c}
              </span>
            ))}
        </NormalText>
        <NormalText>
          {t("CourseDuration")}
          {": "}
          {course.meta._thedah_course.duration ?? ""}
        </NormalText>
        <NormalText>
          {t("CoursePrice")}
          {": "}
          {course.meta._thedah_course.price ?? ""}
        </NormalText>
        <ReadMore href={course.permalink ?? ""}>
          {t("moreInformation")}
        </ReadMore>
      </CourseInfo>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  background-color: ${(p) => p.theme.colors[p.color]};
  box-shadow: 0px 1px 7px 0px rgba(35, 30, 26, 0.4);
  border-radius: 10px;
  flex-direction: column;
  width: 285px;
`

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 5px 5px 0px 0px;
  img {
    width: 100%;
    aspect-ratio: 300 / 250;
  }
  overflow: hidden;
	cursor: ${(props) => (props.pointer ? "pointer" : "default")};
`

const CourseInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`

const NormalText = styled.p`
  font-size: 1.2rem;
  font-weight: 400;

  &.summary {
    max-height: 50px;
    overflow-y: auto;
  }
`

const ReadMore = styled.a`
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  color: ${(p) => p.theme.colors.text};
`
