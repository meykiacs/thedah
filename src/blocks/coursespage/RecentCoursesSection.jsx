import { useTranslation } from "react-i18next"
import { Section } from "../../components/common/Section"
import { SectionTitle } from "../../components/common/SectionTitle"
import styled from "@emotion/styled"
import useResourceList from "../../hooks/useResourceList"
import { CourseCard } from "./CourseCard"
import { mq } from "../../utils/mq"

export const RecentCoursesSection = () => {
  const { t } = useTranslation()
  const papers = useResourceList("course")
  return (
    <Section>
      <SectionTitle title={t("recentCourses")} />
      <Wrapper>
        {papers.map((c) => (
          <CourseCard key={c.id} course={c} color='white' />
        ))}
      </Wrapper>
    </Section>
  )
}

const Wrapper = styled.div`
  margin-top: 65px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 70px;

  ${mq("md")} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq("xl")} {
    grid-template-columns: repeat(3, 1fr);
  }
`
