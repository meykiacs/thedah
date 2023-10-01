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
  const [selectedPostId, setSelectedPostId] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  // image upload and remove
  const { images, uploadImage, removeImage, isImageUploading, isImageDeleting } = useImage(
    isEditing,
    selectedPostId,
  )

  // post create and update
  const [updatePost, isUpdatingPost] = useUpdatePost({ id: selectedPostId })
  const [createPost, isCreatingPost] = useCreatePost()
  const createOrUpdatePost = isEditing ? updatePost : createPost
  const isCreatingOrUpdatingPost = isCreatingPost || isUpdatingPost
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
  const [deletePost, isDeleting] = useDelete(selectedPostId, removeImage)
  useEffect(() => {
    if (!isDeleting) {
      setSelectedPostId(0)
    }
  }, [isDeleting])

  return (
    <CrudContext.Provider
      value={{
        isDeleting,
        selectedPostId,
        setSelectedPostId,
        createOrUpdatePost,
        isEditing,
        deletePost,
        setIsEditing,
        images,
        uploadImage,
        removeImage,
        isImageUploading,
        isImageDeleting,
        isCreatingOrUpdatingPost
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
