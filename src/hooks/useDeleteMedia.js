import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../context/useWPContext"

export default function useDeleteMedia({
  featuredMediaId,
  isDeleting,
  setIsDeleting,
}) {
  const { restNonce, mediaRestUrl } = useWPContext()
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const deleteMedia = async () => {
      try {
        const response = await fetch(
          `${mediaRestUrl}/${featuredMediaId}?force=1`,
          {
            method: "DELETE",
            headers: {
              "X-WP-Nonce": restNonce,
            },
          }
        )
        setResponseData(await response.json())
        setIsDeleting(false)
      } catch (e) {
        setError(e)
        setIsDeleting(false)
      }
    }
    if (isDeleting) {
      deleteMedia()
    }
  }, [isDeleting, setIsDeleting, featuredMediaId, mediaRestUrl, restNonce])
  return [responseData, error]
}
