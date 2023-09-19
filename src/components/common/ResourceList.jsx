import { useEffect } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
import styled from "@emotion/styled"
import useResourceContext from "../../context/useResourceContext"
import { PaperCard } from "../paperpage/PaperCard"
import { RecentPaperCard } from "../paperpage/RecentPaperCard"

export default function ResourceList() {
  const { resource, resourceName } = useResourceContext()

  const {
    fa,
    en,
    isFaFetched,
    isEnFetched,
    setIsFaFetched,
    setIsEnFetched,
    setFa,
    setEn,
    restUrlEn,
    restUrlFa,
  } = resource
  const { lang } = useLanguageContext()
  const rs = lang === "fa" ? fa : en

  useEffect(() => {
    const fetchResource = async (url, setResource, setFetched) => {
      const response = await fetch(url)
      const data = await response.json()
      const resource = data.map((r) => ({
        id: r.id,
        picture: r.thumbnail,
        title: r.title.rendered,
        description: r.content.rendered,
        meta: r.meta,
      }))
      setResource(resource)
      setFetched(true)
    }

    if (lang === "fa" && !isFaFetched) {
      fetchResource(restUrlFa, setFa, setIsFaFetched)
    }

    if (lang === "en" && !isEnFetched) {
      fetchResource(restUrlEn, setEn, setIsEnFetched)
    }
  }, [
    lang,
    restUrlEn,
    restUrlFa,
    isEnFetched,
    isFaFetched,
    setIsEnFetched,
    setIsFaFetched,
    setEn,
    setFa,
  ])

  let Component
  switch (resourceName) {
    case "paper":
      Component = PaperCard
      break
    default:
      break
  }
  return (
    <Wrapper>
      {rs.map((r) => (
        <>
          <Component key={r.id} r={r} />
          <RecentPaperCard key={r.id} r={r} />
        </>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`
