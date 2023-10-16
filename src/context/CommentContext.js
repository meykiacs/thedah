import { createContext, useContext, useState } from "@wordpress/element"

export const CommentContext = createContext()

export const CommentProvider = ({ children }) => {
  const [writtenComments, setWrittenComments] = useState([])
  const [allComments, setAllComments] = useState([])
  const [showAllComments, setShowAllComments] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <CommentContext.Provider
      value={{
        writtenComments,
        setWrittenComments,
        allComments,
        setAllComments,
        showAllComments,
        setShowAllComments,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export const useCommentContext = () => {
  const context = useContext(CommentContext)
  if (context === undefined) {
    throw new Error("useCommentContext must be used inside a CommentContext.Provider")
  }

  return context
}
