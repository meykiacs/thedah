import { useEffect } from "@wordpress/element"
import useResourceContext from "../context/useResourceContext"

export default function useResourceList(resourceName) {
  const { resources } = useResourceContext()

  const { restUrl, setFetched, rs, setR, fetched } = resources[resourceName]
  useEffect(() => {
    const fetchResource = async (url, setResource, setFetched) => {
      const response = await fetch(url)
      const data = await response.json()
      setResource(
        data.map((r) => {

          return {
            id: r.id,
            featured_media: "",
            featured_media_url: "",
            title: r.title.rendered,
            content: r.content.rendered,
            meta: r.meta,
            type: r.type,
          }
        }),
      )

      setFetched(true)
    }

    if (!fetched) {
      fetchResource(restUrl, setR, setFetched)
    }
  }, [resources, restUrl, fetched, setFetched, setR])
  return rs
}
