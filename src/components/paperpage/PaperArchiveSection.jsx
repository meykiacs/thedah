import { useState } from "@wordpress/element"
import { useTranslation } from "react-i18next"
import { Section } from "../common/Section"
import { SectionTitle } from "../common/SectionTitle"
import styled from "@emotion/styled"
import { PaperCard } from "./PaperCard"
import { mq } from "../../utils/mq"
import useResourceContext from "../../context/useResourceContext"
import useLanguageContext from "../../context/useLanguageContext"
import Button from "../common/Button"
import { useTheme } from "@emotion/react"

export const PaperArchiveSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { resources, restNonce } = useResourceContext()
  const [pageEn, setPageEn] = useState(1)
  const [pageFa, setPageFa] = useState(1)
  const [finishedFa, setFinishedFa] = useState(false)
  const [finishedEn, setFinishedEn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { restUrl, rs, setR } = resources.paper
  const { lang } = useLanguageContext()
  const page = lang === "fa" ? pageFa : pageEn
  const finished = lang === "fa" ? finishedFa : finishedEn
  const setFinished = lang === "fa" ? setFinishedFa : setFinishedEn
  const setPage = lang === "fa" ? setPageFa : setPageEn
  const loadMorePapers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${restUrl}?per_page=12&page=${page + 1}`, {
        headers: {
          "X-WP-Nonce": restNonce,
        },
      })
      const data = await response.json()
      if ("data" in data) {
        throw new Error(data.code ?? "")
      }
      const newPapers = data.map((r) => {
        return {
          id: r.id,
          featured_media: "",
          featured_media_url: "",
          title: r.title.rendered,
          content: r.content.rendered,
          meta: r.meta,
          type: r.type,
          permalink: r.link,
        }
      })

      setR((prevPapers) => [...prevPapers, ...newPapers])
      setPage(page + 1)
      setIsLoading(false)
    } catch (e) {
      setFinished(true)
      console.error(e)
      setIsLoading(false)
    }
  }

  return (
    <Section>
      <SectionTitle title={t("paperArchive")} />
      <Wrapper>
        {rs.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </Wrapper>
      {!finished && (
        <StyledButton
          variant="fill"
          color={theme.colors.gray}
          colorHover={theme.colors.gray}
          br="6px"
          fz="1.4rem"
          fw="500"
          p="10px 50px"
          onClick={loadMorePapers}
        >
          {isLoading ? "Loading..." : t("morePapers")}
        </StyledButton>
      )}
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

const StyledButton = styled(Button)`
  margin-top: 50px;
  align-self: center;
  color: ${(p) => p.theme.colors.text};
`
