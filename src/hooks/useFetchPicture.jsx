import { useEffect, useState } from "@wordpress/element"

export default function useFetchPicture({
  pictureFile,
  mediaRestUrl,
  restNonce,
}) {
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (pictureFile) {
      setIsLoading(true)
      const fetchPicture = async () => {
        try {
          // const reader = new FileReader()
          // reader.onloadend = async () => {
          const response = await fetch(mediaRestUrl, {
            method: "POST",
            headers: {
              "Content-Type": pictureFile.type,
              "Content-Disposition": `attachment; filename="${pictureFile.name}"`,
              "X-WP-Nonce": restNonce,
            },
            body: pictureFile,
            // body: reader.result,
          })
          const responseData = await response.json()
          setResponseData(responseData)
          setIsLoading(false)
          // }
          // reader.readAsArrayBuffer(pictureFile)
        } catch (error) {
          setError(error)
        }
      }
      fetchPicture()
    }
  }, [mediaRestUrl, restNonce, pictureFile])
  return [isLoading, responseData, error]
}
