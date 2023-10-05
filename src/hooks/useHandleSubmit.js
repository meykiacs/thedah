export const useHandleSubmit = (createOrUpdatePost) => {

  const submit = async (event, meta, title='', content, featuredMediaId = 0) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const data = {
      title: title ? title : formData.get("title") ?? "",
      content: content ? content : formData.get("content") ?? "",
      status: "publish",
      featured_media: featuredMediaId,
      meta,
    }
    await createOrUpdatePost(data, event)
  }

  return submit
}
