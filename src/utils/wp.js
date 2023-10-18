export function createPostObjectFromData(responseData) {
  return {
    id: responseData.id,
    type: responseData.type,
    title: responseData.title.raw,
    content: responseData.content.raw,
    featured_media_id: responseData.featured_media,
    permalink: responseData.link,
    date: responseData.date,
    modified: responseData.modified,
    meta: responseData.meta,
  }
}

export function getImages(post) {
  return Array.isArray(post?.meta?._thedah_images) ? post.meta._thedah_images : []
}