import { useEffect, useState } from "@wordpress/element"
import useDelete from "../../hooks/useDelete"
import useResourceContext from "../../context/useResourceContext"
import PaperCard from "./PaperCard"
import { BookCard } from "./BookCard"

export function ResourceCard({ r, resourceName }) {
  const { resources, mediaRestUrl } = useResourceContext()
  const { setFa, setEn, restUrlEn, restUrlFa } = resources[resourceName]
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)

  const [deleteResponseData, deleteError] = useDelete({
    id: r.id,
    isDeleting,
    setIsDeleting,
    restUrl: r.type.endsWith("fa") ? restUrlFa : restUrlEn,
  })
  const [deleteMediaResponseData, deleteMediaError] = useDelete({
    id: r.featured_media,
    isDeleting: isMediaDeleting,
    setIsDeleting: setIsMediaDeleting,
    restUrl: mediaRestUrl,
  })

  if (deleteMediaResponseData) {
    console.log(deleteMediaResponseData)
  }

  useEffect(() => {
    if (deleteResponseData && deleteResponseData.deleted === true) {
      const id = deleteResponseData.previous.id
      if (r.type.endsWith("fa")) {
        setFa((prev) => prev.filter((b) => b.id !== id))
      } else {
        setEn((prev) => prev.filter((b) => b.id !== id))
      }
    }
  }, [r, deleteResponseData, setEn, setFa])

  if (deleteError) {
    console.error(deleteError)
  }
  if (deleteMediaError) {
    console.error(deleteMediaError)
  }

  let C
  switch (resourceName) {
    case "paper":
      C = PaperCard
      break
    case "book":
      C = BookCard
      break
    default:
      break
  }
  return (
    <C
      r={r}
      isDeleting={isDeleting}
      setIsMediaDeleting={setIsMediaDeleting}
      setIsDeleting={setIsDeleting}
    />
  )
}
