import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../context/useWPContext"

export default function useDelete({
  id,
  isDeleting,
  setIsDeleting,
  restUrl
}) {
  const { restNonce } = useWPContext()
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const deleteResource = async () => {
      try {
        const response = await fetch(
          `${restUrl}/${id}?force=1`,
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
      deleteResource()
    }
  }, [isDeleting, setIsDeleting, id, restUrl, restNonce])
  return [responseData, error]
}
