import { useTranslation } from "react-i18next"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import styled from "@emotion/styled"
import useResourceList from "../../hooks/useResourceList"
import { PaperCard } from "./PaperCard"
import { mq } from "../../utils/mq"

export const PaperArchiveSection = () => {
  const { t } = useTranslation()
  const papers = useResourceList("paper")
  return (
    <Section>
      <SectionTitle title={t("paperArchive")} />
      <Wrapper>
        {papers.map((p) => (
          <PaperCard key={p.id} paper={p} />
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
