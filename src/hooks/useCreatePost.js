import { useState } from "@wordpress/element"
import { createPostObjectFromData } from "../utils/wp"
import useResourceContext from "../context/useResourceContext"

export const useCreatePost = () => {
  const { resourceName, resources, restNonce } = useResourceContext()
  const { restUrl, rs, setR } = resources[resourceName]
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  async function createPost(data, event) {
    setIsCreatingPost(true)
    const body = JSON.stringify(data)
    try {
      const response = await fetch(restUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body,
      })
      const responseData = await response.json()
      if (responseData && "id" in responseData) {
        const post = createPostObjectFromData(responseData)
        setR([post, ...rs])
        event.target.reset()
        return post
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreatingPost(false)
    }
  }

  return [createPost, isCreatingPost]
}
