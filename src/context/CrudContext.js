import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "@wordpress/element"
import useDelete from "../hooks/useDelete"
import { useUpdatePost } from "../hooks/useUpdatePost"
import { useCreatePost } from "../hooks/useCreatePost"
import { useImage } from "../hooks/useImage"

const CrudContext = createContext()

export const CrudContextProvider = ({ children }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  // image upload and remove
  const { images, uploadImage, removeImage } = useImage(
    isEditing,
    selectedPostId,
  )

  // post create and update
  const [updatePost, isUpdatingPost] = useUpdatePost({ id: selectedPostId })
  const [createPost, isCreatingPost] = useCreatePost()
  const createOrUpdatePost = isEditing ? updatePost : createPost
  const isCreatingOrUpdating = isUpdatingPost || isCreatingPost
  useEffect(() => {
    if (isUpdatingPost) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [isUpdatingPost])

  useEffect(() => {
    if (isUpdatingPost) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [isUpdatingPost])

  useEffect(() => {
    if (isCreatingPost) {
      setSelectedPostId(0)
    }
  }, [isCreatingPost])

  // post deletion
  const [deletePostResult, deletePostError] = useDelete({
    id: selectedPostId,
    isDeleting,
    setIsDeleting,
  })
  useEffect(() => {
    if (deletePostResult && !deletePostError) {
      // handle post-deletion logic here, e.g., remove the post from the list
    }
  }, [deletePostResult, deletePostError])

  return (
    <CrudContext.Provider
      value={{
        isDeleting,
        setIsDeleting,
        selectedPostId,
        setSelectedPostId,
        createOrUpdatePost,
        isCreatingOrUpdating,
        isEditing,
        setIsEditing,
        images,
        uploadImage,
        removeImage,
      }}
    >
      {children}
    </CrudContext.Provider>
  )
}

export const useCrudContext = () => {
  const context = useContext(CrudContext)
  if (context === undefined) {
    throw new Error("useCrudContext must be used inside a CrudContext.Provider")
  }

  return context
}
