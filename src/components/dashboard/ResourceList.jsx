import { useEffect } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
import { Stack } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import { ResourceCard } from "./ResourceCard"

export default function ResourceList({ resourceName }) {
  const { resources } = useResourceContext()
  const {
    fa,
    en,
    isFaFetched,
    isEnFetched,
    setIsFaFetched,
    setIsEnFetched,
    setFa,
    setEn,
    restUrlFa,
    restUrlEn,
  } = resources[resourceName]
  const { lang } = useLanguageContext()
  const rs = lang === "fa" ? fa : en

  useEffect(() => {
    const fetchResource = async (url, setResource, setFetched) => {
      const response = await fetch(url)
      const data = await response.json()
      const rs = data.map((r) => ({
        id: r.id,
        featured_media_urk: r.thumbnail,
        title: r.title.rendered,
        content: r.content.rendered,
        meta: r.meta,
        type: r.type
      }))
      setResource(rs)
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

  return (
    <Stack maxW="container.md">
      {rs.map((r) => (
        <ResourceCard key={r.id} r={r} resourceName={resourceName} />
      ))}
    </Stack>
  )
}
