export default async function submitWPForm(
  restUrl,
  restNonce,
  data,
  setIsSubmitting,
  editingBookId
) {
  if (editingBookId !== 0) {
    restUrl = `${restUrl}/${editingBookId}`
  }
  let responseData = null
  let error = null
  const body = JSON.stringify(data)
  try {
    setIsSubmitting(true)
    const response = await fetch(restUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": restNonce,
      },
      body,
    })
    responseData = await response.json()
    setIsSubmitting(false)
  } catch (e) {
    setIsSubmitting(false)
    error = e
  }
  return [responseData, error]
}
