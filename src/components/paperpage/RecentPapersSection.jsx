import { useTranslation } from "react-i18next"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import styled from "@emotion/styled"
import { mq } from "../../utils/mq"
import { RecentPapersCarousel } from "./RecentPapersCarousel"

export const RecentPapersSection = () => {
  const { t } = useTranslation()

  return (
    <Section>
      <SectionTitle title={t("recentPapers")} />
      <CarouselWrapper>
        <RecentPapersCarousel />
      </CarouselWrapper>
    </Section>
  )
}

const CarouselWrapper = styled.div`
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
