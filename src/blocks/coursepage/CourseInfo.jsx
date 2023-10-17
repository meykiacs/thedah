import styled from "@emotion/styled"
import useWPContext from "../../context/useWPContext"
import { useTranslation } from "react-i18next"
import { ButtonV2 } from "../../components/common/ButtonV2"
import { useTheme } from "@emotion/react"
import { mq } from "../../utils/mq"

export const CourseInfo = () => {
  const {
    postTitle,
    instructor,
    duration,
    price,
    organizer,
    courseType,
    availability,
  } = useWPContext()
  const theme = useTheme()
  const { t } = useTranslation()
  const button = {
    soon: {
      buttonText: "Soon",
      disabled: true,
      color: "secondary",
    },
    available: {
      buttonText: "Enroll",
      disabled: false,
      color: "seconsary",
    },
    finished: {
      buttonText: "Finished",
      disabled: true,
      color: "grayDark",
    },
  }
  return (
    <Wrapper>
      <CourseTitle>{postTitle}</CourseTitle>
      <OtherInfo>
        {t("Instructor")}
        {": "}
        {instructor}
      </OtherInfo>
      <OtherInfo>
        {t("CourseDuration")}
        {": "}
        {duration ?? ""}
      </OtherInfo>
      <OtherInfo>
        {t("CoursePrice")}
        {": "}
        {price}
      </OtherInfo>
      <OtherInfo>
        {t("Organizer")}
        {": "}
        {organizer ?? ""}
      </OtherInfo>
      <OtherInfo>
        {t("CourseType")}
        {": "}
        {courseType}
      </OtherInfo>
      <StyledButtonV2
        variant="fill"
        disabled={button[availability].disabled}
        br="7px"
        h="50px"
        w="150px"
        fz="1.5rem"
        fw={500}
        color={theme.colors[button[availability].color]}
        colorHover={theme.colors[button[availability].color]}
      >
        {t(button[availability].buttonText)}
      </StyledButtonV2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`

const CourseTitle = styled.h1`
  font-weight: 700;
  color: ${(p) => p.theme.colors.primary};
  font-size: 2rem;
  
  ${mq('lg')} {
    font-size: 2.4rem;

  }
`

const OtherInfo = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const StyledButtonV2 = styled(ButtonV2)`
  margin-top: auto;
`
