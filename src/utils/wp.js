export function createPostObjectFromData(responseData) {
  return {
    id: responseData.id,
    type: responseData.type,
    title: responseData.title.raw,
    content: responseData.content.raw,
    featured_media_id: responseData.featured_media,
    date: responseData.date,
    modified: responseData.modified,
    meta: responseData.meta,
  }
}
