import styled from "@emotion/styled"
import { Section } from "../common/Section"
import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import { BlogCard } from "./BlogCard"
import { mq } from "../../utils/mq"

export function RecentPosts() {
  const { fa, en } = useResourceContext().resources.recent
  const { lang } = useLanguageContext()
  const recent = lang === "fa" ? fa : en
  return (
    <StyledSection>
      {recent.map((r) => (
        <BlogCard key={r.id} post ={r} />
      ))}
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  background-color: ${(p) => p.theme.colors.white};
  gap: 64px;
  ${mq('md')} {
    gap: 12px;
  }
`
