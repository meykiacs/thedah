import { useEffect, useState } from "@wordpress/element"
import useResourceContext from "../context/useResourceContext"
import useResourceList from "./useResourceList"

export const useImage = (isEditing, selectedPostId) => {
  const { restNonce, mediaRestUrl } = useResourceContext()
  const [images, setImages] = useState([])
  const { resourceName } = useResourceContext()
  const rs = useResourceList(resourceName)
  let selectedPost = null
  if (selectedPostId) {
    selectedPost = rs.find((p) => selectedPostId === p.id)
  }

  useEffect(() => {
    if (isEditing) {
      setImages(selectedPost.meta._thedah_featured_images)
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
  }

  const removeImage = async (id) => {
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
  }

  return { images, uploadImage, removeImage, setImages }
}
