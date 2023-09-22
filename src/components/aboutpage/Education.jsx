import { OrderedList } from "./OrderedList"
import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"

export const Education = () => {
  const { resource } = useResourceContext()
  const { t } = useTranslation()

  const { lang } = useLanguageContext()
  const { fa, en } = resource
  const about = lang === "fa" ? fa : en

  return (
    <Section>
      <SectionTitle title={t("Education")} />
      <StyledOrderedList list={about.meta._thedah_about.education} />
    </Section>
  )
}

const StyledOrderedList = styled(OrderedList)`
  margin-top: 25px;
`