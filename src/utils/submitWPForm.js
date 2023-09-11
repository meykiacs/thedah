export default async function submitWPForm(
  restUrl,
  restNonce,
  data,
  setIsSubmitting
) {
  let responseData = null
  let error = null
  const body = JSON.stringify(data)
  console.log(body)
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
