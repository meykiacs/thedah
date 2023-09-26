import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { UnorderedList } from "./UnorderedList"
import { OrderedList } from "./OrderedList"

const withResourceList = (titleKey, listKey, ListComponent) => {
  return function CallbackComponent() {
    const { resources, resourceName } = useResourceContext()
    const { t } = useTranslation()

    const { lang } = useLanguageContext()
    const { fa, en } = resources[resourceName]
    const about = lang === "fa" ? fa : en

    return (
      <Section>
        <SectionTitle title={t(titleKey)} />
        <ListComponent list={about?.meta?._thedah_about?.[listKey]} />
      </Section>
    )
  }
}

const StyledUnorderedList = styled(UnorderedList)`
  margin-top: 25px;
`

export const AwardsAndHonors = withResourceList(
  "awardsAndHonors",
  "awardsAndHonors",
  StyledUnorderedList
)
export const ExecutiveRecords = withResourceList(
  "executiveRecords",
  "executiveRecords",
  StyledUnorderedList
)
export const Activities = withResourceList(
  "activities",
  "activities",
  OrderedList
)
export const Education = withResourceList(
  "Education",
  "education",
  OrderedList
)
