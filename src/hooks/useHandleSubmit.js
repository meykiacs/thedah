import { useCrudContext } from "../context/CrudContext"

export const useHandleSubmit = () => {
  const { createOrUpdatePost } = useCrudContext()

  const submit = async (event, meta) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      meta,
    }
    await createOrUpdatePost(data)
  }

  return submit
}
