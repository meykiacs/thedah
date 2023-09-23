import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { UnorderedList } from "./UnorderedList"

export const ExecutiveRecords = () => {
  const { resource } = useResourceContext()
  const { t } = useTranslation()

  const { lang } = useLanguageContext()
  const { fa, en } = resource
  const about = lang === "fa" ? fa : en

  return (
    <Section>
      <SectionTitle title={t("executiveRecords")} />
      <StyledUnorderedList list={about?.meta?._thedah_about?.executiveRecords} />
    </Section>
  )
}

const StyledUnorderedList = styled(UnorderedList)`
  margin-top: 25px;
`