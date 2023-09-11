import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../context/useWPContext"

export default function useDeleteBook({
  bookId,
  isDeleting,
  setIsDeleting,
  bookType,
}) {
  const { restNonce, bookRestUrlFa, bookRestUrlEn } = useWPContext()
  const bookRestUrl = bookType === "thedah_book" ? bookRestUrlEn : bookRestUrlFa
  
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const deleteBook = async () => {
      try {
        const response = await fetch(
          `${bookRestUrl}/${bookId}?force=1`,
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
      deleteBook()
    }
  }, [isDeleting, setIsDeleting, bookId, bookRestUrl, restNonce])
  return [responseData, error]
}
