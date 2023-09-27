import { useEffect } from "@wordpress/element"
import useLanguageContext from "../context/useLanguageContext"
import useResourceContext from "../context/useResourceContext"
import useWPContext from "../context/useWPContext"

export default function useResourceList(resourceName) {
  const { resources } = useResourceContext()
  const { mediaRestUrl } = useWPContext()

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

      const resources = await Promise.all(
        data.map(async (r) => {
          let featured_media_url = ""
          if (r.featured_media) {
            const mediaResponse = await fetch(
              `${mediaRestUrl}/${r.featured_media}`
            )
            const mediaData = await mediaResponse.json()
            featured_media_url = mediaData.media_details.sizes.medium?.source_url
          }

          return {
            id: r.id,
            featured_media: r.featured_media,
            featured_media_url: featured_media_url,
            title: r.title.rendered,
            description: r.content.rendered,
            meta: r.meta,
            type: r.type,
          }
        })
      )

      setResource(resources)
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
    mediaRestUrl,
  ])

  return rs
}
