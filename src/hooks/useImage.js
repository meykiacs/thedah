import { useEffect, useState } from "@wordpress/element"
import useResourceContext from "../context/useResourceContext"
import { useGetPostById } from "./useGetPostById"

export const useImage = (isEditing, selectedPostId) => {
  const { restNonce, mediaRestUrl } = useResourceContext()
  const [images, setImages] = useState([])
  const selectedPost = useGetPostById(selectedPostId)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isImageDeleting, setIsImageDeleting] = useState(false)

  useEffect(() => {
    if (isEditing) {
      setImages(selectedPost.meta._thedah_images)
    } else {
      setImages([])
    }
  }, [isEditing, selectedPost])

  const uploadImage = async (file, maxImages) => {
    if (images.length >= maxImages) {
      console.error(
        `Upload failed: You cannot upload more than ${maxImages} images.`,
      )
      return
    }
    setIsImageUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(mediaRestUrl, {
      method: "POST",
      headers: { "X-WP-Nonce": restNonce },
      body: formData,
    })

    if (!response.ok) {
      console.error("Upload failed:", response)
      return
    }

    const data = await response.json()
    console.log("Upload succeeded:", data)
    setImages((images) => [
      ...images,
      {
        id: data.id,
        mediumUrl: data.media_details.sizes.medium?.source_url ?? "",
        thumbnailUrl: data.media_details.sizes.thumbnail?.source_url ?? "",
        mediumLargeUrl: data.media_details.sizes.medium_large?.source_url ?? "",
        largeUrl: data.media_details.sizes.large?.source_url ?? "",
        fullUrl: data.media_details.sizes.full?.source_url ?? "",
      },
    ])
    setIsImageUploading(false)
  }

  const removeImage = async (id) => {
    setIsImageDeleting(true)
    const response = await fetch(`${mediaRestUrl}/${id}?force=1`, {
      method: "DELETE",
      headers: {
        "X-WP-Nonce": restNonce,
      },
    })

    if (!response.ok) {
      console.error("Delete failed:", response)
      return
    }

    console.log("Delete succeeded:", id)
    setImages((images) => images.filter((image) => image.id !== id))
    setIsImageDeleting(false)
  }

  return { images, uploadImage, removeImage, setImages, isImageUploading, isImageDeleting }
}
