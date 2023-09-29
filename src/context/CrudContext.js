import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "@wordpress/element"
import useDelete from "../hooks/useDelete"
import { useUpdatePost } from "../hooks/useUpdatePost"
import { useCreatePost } from "../hooks/useCreatePost"

const CrudContext = createContext()

export const CrudContextProvider = ({ children }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(0)
  const [isEditing, setIsEditing] = useState(null)
  const [deleteMedia, setDeleteMedia] = useState(null)

  const [updatePost, isUpdatingPost] = useUpdatePost()
  const [createPost, isCreatingPost] = useCreatePost()

  if (isEditing && !selectedPostId) {
    throw new Error("Editing while no post is selected")
  }

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
        deleteMedia,
        setDeleteMedia,
        isEditing,
        setIsEditing,
        createPost,
        updatePost,
        isCreatingPost,
        isUpdatingPost,
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
