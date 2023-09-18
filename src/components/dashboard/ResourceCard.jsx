import { useEffect, useState } from "@wordpress/element"
import useDelete from "../../hooks/useDelete"
import useResourceContext from "../../context/useResourceContext"
import PaperCard from "./PaperCard"

export function ResourceCard({ r }) {
  const { resource, resourceName, mediaRestUrl } = useResourceContext()
  const { setFa, setEn, restUrlEn, restUrlFa } = resource
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
    console.log(deleteError)
  }
  if (deleteMediaError) {
    console.log(deleteMediaError)
  }

  let C
  switch (resourceName) {
    case 'paper':
      C = PaperCard
      break;
    default:
      break;
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
