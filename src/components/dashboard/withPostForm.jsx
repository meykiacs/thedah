import { useCrudContext } from "../../context/CrudContext"
import useResourceContext from "../../context/useResourceContext"

export const withPostForm = (WrappedComponent) => {
  const Component = (props) => {
    const {
      createOrUpdatePost,
      isEditing,
      setIsEditing,
      uploadImage,
      removeImage,
      images,
      selectedPostId,
    } = useCrudContext()
    const { resources, resouceName } = useResourceContext()

    let post = null
    if (selectedPostId) {
      post = resources[resouceName].filter((p) => selectedPostId === p.id)
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
          ...props.handleMeta(formData),
        },
      }
      createOrUpdatePost(data)
    }

    return (
      <WrappedComponent
        {...props}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        uploadImage={uploadImage}
        removeImage={removeImage}
        images={images}
      />
    )
  }
  return Component
}
