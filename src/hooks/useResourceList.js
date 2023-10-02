import { useEffect } from "@wordpress/element"
import useResourceContext from "../context/useResourceContext"
import useWPContext from "../context/useWPContext"

export default function useResourceList(resourceName) {
  const { resources } = useResourceContext()
  const { mediaRestUrl } = useWPContext()

  const { restUrl, setFetched, rs, setR, fetched } = resources[resourceName]
  useEffect(() => {
    const fetchResource = async (url, setResource, setFetched) => {
      const response = await fetch(url)
      const data = await response.json()

      const resources = await Promise.all(
        data.map(async (r) => {
          let featured_media_url = ""
          if (r.featured_media) {
            const mediaResponse = await fetch(
              `${mediaRestUrl}/${r.featured_media}`,
            )
            const mediaData = await mediaResponse.json()
            featured_media_url =
              mediaData.media_details.sizes.medium?.source_url
          }

          return {
            id: r.id,
            featured_media: r.featured_media,
            featured_media_url: featured_media_url,
            title: r.title.rendered,
            content: r.content.rendered,
            meta: r.meta,
            type: r.type,
          }
        }),
      )

      setResource(resources)
      setFetched(true)
    }

    if (!fetched) {
      fetchResource(restUrl, setR, setFetched)
    }
  }, [mediaRestUrl, restUrl, fetched, setFetched, setR])

  return rs
}
