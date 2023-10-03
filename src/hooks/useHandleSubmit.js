export const useHandleSubmit = (createOrUpdatePost) => {

  const submit = async (event, meta, featuredMediaId = 0) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      featured_media: featuredMediaId,
      meta,
    }
    await createOrUpdatePost(data, event)
  }

  return submit
}
