import { useCrudContext } from "../../context/CrudContext"
import { ImageList } from "./ImageList"
import { ImageDropzone } from "./ImageDropZone"
import { useHandleSubmit } from "../../hooks/useHandleSubmit"
import useResourceList from "../../hooks/useResourceList"

export const SinglePostForm = ({ maxImages }) => {
  const {
    selectedPostId,
    isEditing,
    setIsEditing,
    uploadImage,
    removeImage,
    images,
  } = useCrudContext()
  const rs = useResourceList("singlepost")

  let selectedPost = null
  if (selectedPostId) {
    selectedPost = rs.find((p) => selectedPostId === p.id)
  }
  const meta = {
    _thedah_featured_images: images,
  }

  const handleSubmit = useHandleSubmit()
  return (
    <form onSubmit={(event) => handleSubmit(event, meta)}>
      <h2>{isEditing ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        name="title"
        defaultValue={
          isEditing && selectedPost?.title ? selectedPost.title : ""
        }
      />
      <textarea
        name="content"
        defaultValue={
          isEditing && selectedPost?.content ? selectedPost.content : ""
        }
      />
      <ImageDropzone
        onDrop={(files) => files.forEach((f) => uploadImage(f, maxImages))}
      />
      <div>
        <ImageList images={images} onRemove={removeImage} />
      </div>

      <button type="submit">{isEditing ? "Update" : "Create"}</button>
      {isEditing && (
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsEditing(false)
          }}
        >
          Cancel
        </button>
      )}
    </form>
  )
}
