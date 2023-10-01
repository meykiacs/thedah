import { useState } from "@wordpress/element"
import { createPostObjectFromData } from "../utils/wp"
import useResourceContext from "../context/useResourceContext"

export const useUpdatePost = ({ id }) => {
  const { resourceName, resources, restNonce } = useResourceContext()
  const { restUrl, rs, setR } = resources[resourceName]

  const [isUpdatingPost, setIsUpdatingPost] = useState(false)

  async function updatePost(data, event) {
    setIsUpdatingPost(true)
    const endpoint = `${restUrl}/${id}`
    const body = JSON.stringify(data)
    try {
      const response = await fetch(endpoint, {
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
        setR(rs.map((r) => (r.id === post.id ? post : r)))
        event.target.reset()
        return post
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdatingPost(false)
    }
  }

  return [updatePost, isUpdatingPost]
}
