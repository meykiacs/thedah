// import { useEffect, useState } from "@wordpress/element"
// import useResourceContext from "../context/useResourceContext"

// export default function useDelete({ id, isDeleting, setIsDeleting }) {
//   const { restNonce, resources, resourceName } = useResourceContext()
//   const { restUrl } = resources[resourceName]
//   const [responseData, setResponseData] = useState(null)
//   const [error, setError] = useState(null)
//   useEffect(() => {
//     const deleteResource = async () => {
//       try {
//         const response = await fetch(`${restUrl}/${id}?force=1`, {
//           method: "DELETE",
//           headers: {
//             "X-WP-Nonce": restNonce,
//           },
//         })
//         setResponseData(await response.json())
//         setIsDeleting(false)
//       } catch (e) {
//         setError(e)
//         setIsDeleting(false)
//       }
//     }
//     if (isDeleting) {
//       deleteResource()
//     }
//   }, [isDeleting, setIsDeleting, id, restUrl, restNonce])
//   return [responseData, error]
// }

import { useState } from "@wordpress/element"
import useResourceContext from "../context/useResourceContext"
import { useGetPostById } from "./useGetPostById"

export default function useDelete(selectedPostId, removeImage) {

  const { restNonce, resources, resourceName } = useResourceContext()
  const { restUrl, setR } = resources[resourceName]
  const [isDeleting, setIsDeleting] = useState(false)
  const selectedPost = useGetPostById(selectedPostId)

  const deleteResource = async (id) => {
    setIsDeleting(true)
    try {
      selectedPost.meta._thedah_images.forEach(image => {removeImage(image.id)})
      const response = await fetch(`${restUrl}/${id}?force=1`, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": restNonce,
        },
      })
      const responseData = await response.json()
      if (responseData && responseData.deleted === true) {
        const deletedPostId = responseData.previous.id
        if (deletedPostId !== id) {
          throw new Error(
            "deleted post id not the same as the id to be deleted",
          )
        }
        setR((prev) => prev.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return [deleteResource, isDeleting]
}
