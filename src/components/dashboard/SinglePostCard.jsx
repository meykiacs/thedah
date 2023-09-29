import useSinglePostContext from "../../context/SinglePostContext"

export const SinglePostCard = ({ post }) => {
  const { setDeletingPost, setSelectedPost } = useSinglePostContext()

  return (
    <div key={post.id}>
      <h2>{post.title.raw}</h2>
      <p>{post.content.raw}</p>
      {post.meta._thedah_featured_images.map((i) => (
        <img key={i.id} src={i.mediumUrl} alt={post.title} />
      ))}
      <button
        onClick={() => {
          setDeletingPost(post)
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          setSelectedPost(post)
        }}
      >
        Edit
      </button>
    </div>
  )
}
