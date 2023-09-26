import { useEffect } from "@wordpress/element"
import useLanguageContext from "../context/useLanguageContext"
import useResourceContext from "../context/useResourceContext"

export default function useResourceList(resourceName) {
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
    restUrlEn,
    restUrlFa,
  } = resources[resourceName]
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

  return rs
}
