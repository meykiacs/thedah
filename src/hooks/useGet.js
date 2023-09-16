import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../context/useWPContext"

export default function useGet({
  id,
  isGetting,
  setIsGetting,
  restUrl
}) {
  const { restNonce } = useWPContext()
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const getResource = async () => {
      try {
        const response = await fetch(
          `${restUrl}/${id}`,
          {
            method: "GET",
            headers: {
              "X-WP-Nonce": restNonce,
            },
          }
        )
        setResponseData(await response.json())
        setIsGetting(false)
      } catch (e) {
        setError(e)
        setIsGetting(false)
      }
    }
    if (isGetting) {
      getResource()
    }
  }, [isGetting, setIsGetting, id, restUrl, restNonce])
  return [responseData, error]
}
