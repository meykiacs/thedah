import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { UnorderedList } from "./UnorderedList"

const StyledUnorderedList = styled(UnorderedList)`
  margin-top: 25px;
`

const withResourceList = (titleKey, listKey) => {
  return function CallbackComponent() {
    const { resources, resourceName } = useResourceContext()
    const { t } = useTranslation()

    const { lang } = useLanguageContext()
    const { fa, en } = resources[resourceName]
    const about = lang === "fa" ? fa : en

    return (
      <Section>
        <SectionTitle title={t(titleKey)} />
        <StyledUnorderedList list={about?.meta?._thedah_about?.[listKey]} />
      </Section>
    )
  }
}

export const AwardsAndHonors = withResourceList(
  "awardsAndHonors",
  "awardsAndHonors"
)
export const ExecutiveRecords = withResourceList(
  "executiveRecords",
  "executiveRecords"
)
export const Activities = withResourceList(
  "activities",
  "activities"
)
export const Education = withResourceList(
  "education",
  "education"
)
