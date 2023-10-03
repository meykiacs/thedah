import { useEffect, useState } from "@wordpress/element"
import useFetchPicture from "../hooks/useFetchPicture"
import useDelete from "../hooks/useDelete"
import useResourceContext from "../context/useResourceContext"

export function UseFeturedImage() {
  const { mediaRestUrl, restNonce } = useResourceContext()
  
  const [featuredMediaId, setFeaturedMediaId] = useState(0)
  const [featuredMediaUrl, setFeaturedMediaUrl] = useState("")
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)

  const file = files[0] ?? null

  useEffect(() => {
    if (editingResource !== null) {
      setFeaturedMediaId(editingResource.featured_media)
      setFeaturedMediaUrl(editingResource.featured_media_url)
    }
  }, [editingResource])

  const [isMediaUploading, mediaUploadResponseData, mediaUploadError] =
    useFetchPicture({ pictureFile: file, mediaRestUrl, restNonce })

  useEffect(() => {
    if (mediaUploadResponseData) {
      setFeaturedMediaId(mediaUploadResponseData.id)
      setFeaturedMediaUrl(mediaUploadResponseData.source_url)
    }
  }, [mediaUploadResponseData])

  if (mediaUploadError) {
    console.log(`Picture Post Error: ${mediaUploadError}`)
  }

  const [mediaDeleteResponseData, mediaDeleteError] = useDelete({
    id: featuredMediaId,
    isDeleting: isMediaDeleting,
    setIsDeleting: setIsMediaDeleting,
    restUrl: mediaRestUrl,
  })

  useEffect(() => {
    if (mediaDeleteResponseData) {
      setFeaturedMediaId(0)
      setFeaturedMediaUrl("")
    }
  }, [mediaDeleteResponseData, mediaDeleteError])

  return {
    featuredMediaId,
    featuredMediaUrl,
    setFeaturedMediaId,
    setFeaturedMediaUrl,
    setFiles,
    isMediaUploading,
    setIsMediaDeleting,
    isMediaDeleting,
  }
}
