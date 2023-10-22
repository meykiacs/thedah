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
import { useHandleSubmit } from "../hooks/useHandleSubmit"
import { useGetPostById } from "../hooks/useGetPostById"
import { getImages } from "../utils/wp"
import useResourceContext from "./useResourceContext"

const CrudContext = createContext()

export const CrudContextProvider = ({ children }) => {
  const [selectedPostId, setSelectedPostId] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const selectedPost = useGetPostById(selectedPostId)
  const { resourceName, singleResources } = useResourceContext()
  // post create and update
  const [updatePost, isUpdatingPost] = useUpdatePost({ id: selectedPostId })
  const [createPost, isCreatingPost] = useCreatePost()
  const createOrUpdatePost = isEditing ? updatePost : createPost
  const isCreatingOrUpdatingPost = isCreatingPost || isUpdatingPost
  const handleSubmit = useHandleSubmit(createOrUpdatePost)
  useEffect(() => {
    if (isUpdatingPost) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [isUpdatingPost])

  // image upload and remove
  const {
    images,
    uploadImage,
    removeImage,
    setImages,
    isImageUploading,
    isImageDeleting,
  } = useImage(isCreatingOrUpdatingPost, selectedPostId)

  useEffect(() => {
    if (isCreatingOrUpdatingPost || isEditing) {
      setImages(getImages(selectedPost))
    } else {
      setImages([])
    }
  }, [isCreatingOrUpdatingPost, selectedPost, isEditing, setImages])

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

  const isLocked =
    (isEditing && !singleResources.includes(resourceName)) ||
    isCreatingOrUpdatingPost ||
    isDeleting ||
    images.length > 0

  return (
    <CrudContext.Provider
      value={{
        isDeleting,
        selectedPostId,
        selectedPost,
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
        isCreatingOrUpdatingPost,
        handleSubmit,
        isLocked,
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
