import { useState } from "@wordpress/element"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import useResourceContext from "../../context/useResourceContext"
import {useCrudContext} from "../../context/CrudContext"

export const SinglePostForm = ({ postType }) => {
  const {
    selectedPostId,
    isEditing,
    setIsEditing,
    updatePost,
    createPost,
  } = useCrudContext()
  const { mediaRestUrl, restNonce, resources } = useResourceContext()
  const [createImages, setCreateImages] = useState([])
  const [editImages, setEditImages] = useState([])

  const images = isEditing ? editImages : createImages
  let post = null
  if (selectedPostId) {
    post = resources[postType].filter((p) => selectedPostId === p.id)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      meta: {
        _thedah_featured_images:
          selectedPostId === 0 ? createImages : editImages,
      },
    }
    if (isEditing) {
      updatePost(selectedPostId, data)
    } else {
      createPost(data)
    }
  }

  const uploadImage = async (file) => {
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
    const setImages = isEditing ? setEditImages : setCreateImages
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
    const response = await fetch(`${mediaRestUrl}/${id}`, { method: "DELETE" })

    if (!response.ok) {
      console.error("Delete failed:", response)
      return
    }

    console.log("Delete succeeded:", id)
    setCreateImages((images) => images.filter((image) => image.id !== id))
    setEditImages((images) => images.filter((image) => image.id !== id))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Post" : "CreatePost"}</h2>
      <input type="text" name="title" defaultValue={post?.title?.rendered} />
      <textarea name="content" defaultValue={post?.content?.rendered} />
      <Dropzone
        onDrop={(files) => files.forEach((f) => uploadImage(f, true))}
        accept={IMAGE_MIME_TYPE}
      />
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.mediumUrl} alt="" />
            <button onClick={() => removeImage(image.id)}>Remove</button>
          </div>
        ))}
      </div>

      <button type="submit">{isEditing ? "Update" : "Create"}</button>
      {isEditing && (
        <button
          onClick={() => {
            setIsEditing(false)
          }}
        >
          Cancel
        </button>
      )}
    </form>
  )
}
