import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { UnorderedList } from "./UnorderedList"
import { OrderedList } from "./OrderedList"
import useResourceList from "../../hooks/useResourceList"

const withResourceList = (titleKey, listKey, ListComponent) => {
  return function CallbackComponent() {
    const { t } = useTranslation()

    const about = useResourceList('about')[0]

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
const StyledOrderedList = styled(OrderedList)`
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
  StyledOrderedList
)
export const Education = withResourceList(
  "Education",
  "education",
  StyledOrderedList
)
