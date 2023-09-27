import { useState, useEffect } from "@wordpress/element"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import useResourceContext from "../../context/useResourceContext"
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"
import submitWPForm from "../../utils/submitWPForm"

export const SinglePostForm = () => {
  const { resources, mediaRestUrl } = useResourceContext()
  const { restUrlFa, restUrlEn } = resources.singlePost
  const { restNonce } = useWPContext()
  const { lang } = useLanguageContext()
  const [posts, setPosts] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [createImages, setCreateImages] = useState([])
  const [editImages, setEditImages] = useState([])
  const restUrl = lang === "en" ? restUrlEn : restUrlFa
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(restUrl)
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [restUrl])

  const handleSubmit = async (event, editId = 0) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      meta: {
        _thedah_featured_images: editId === 0 ? createImages : editImages,
      },
    }

    const [responseData, error] = await submitWPForm(
      restUrl,
      restNonce,
      data,
      setIsSubmitting,
      editId
    )
    console.log(responseData)
    console.log(error)
  }

  const uploadImage = async (file, isEdit) => {
    console.log(isEdit)
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
    const setImages = isEdit ? setEditImages : setCreateImages
    setImages((images) => [
      ...images,
      {
        id: data.id,
        mediumUrl: data.media_details.sizes.medium?.source_url ?? '',
        thumbnailUrl: data.media_details.sizes.thumbnail?.source_url ?? '',
        mediumLargeUrl: data.media_details.sizes.medium_large?.source_url ?? '',
        largeUrl: data.media_details.sizes.large?.source_url ?? '',
        fullUrl: data.media_details.sizes.full?.source_url ?? '',
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
    <div>
      <h1>Single Post</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title.rendered}</h2>
          <p>{post.content.rendered}</p>
          {post.meta._thedah_featured_images.map((i) => (
            <img key={i.id} src={i.mediumUrl} alt={post.title} />
          ))}
          <button
            onClick={() => {
              deletePost(post.id)
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setSelectedPost(post)
            }}
          >
            Edit
          </button>
        </div>
      ))}
      {selectedPost && (
        <form onSubmit={(e) => handleSubmit(e, selectedPost.id)}>
          <h2>Edit Post</h2>
          <input
            type="text"
            name="title"
            defaultValue={selectedPost.title.rendered}
          />
          <textarea
            name="content"
            defaultValue={selectedPost.content.rendered}
          />
          <Dropzone
            onDrop={(files) => files.forEach(f => uploadImage(f, true))}
            accept={IMAGE_MIME_TYPE}
          />
          <div>
            {editImages.map((image) => (
              <div key={image.id}>
                <img src={image.mediumUrl} alt="" />
                <button onClick={() => removeImage(image.id)}>Remove</button>
              </div>
            ))}
          </div>

          <button type="submit">Update Post</button>
          <button
            onClick={() => {
              setSelectedPost(null)
            }}
          >
            Cancel
          </button>
        </form>
      )}
      <div>
        <h2>Create Post</h2>
        <form onSubmit={(e) => handleSubmit(e, 0)}>
          <input type="text" name="title" />
          <textarea name="content" />
          <Dropzone
            onDrop={(files) => files.forEach(uploadImage, false)}
            accept={IMAGE_MIME_TYPE}
          />
          <div>
            {createImages.map((image) => (
              <div key={image.id}>
                <img src={image.mediumUrl} alt="" />
                <button onClick={() => removeImage(image.id)}>Remove</button>
              </div>
            ))}
          </div>

          <button>Create Post</button>
        </form>
      </div>
    </div>
  )
}
