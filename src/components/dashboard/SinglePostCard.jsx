import { useCrudContext } from "../../context/CrudContext"

export const SinglePostCard = ({ post }) => {
  const { setIsDeleting, setIsEditing } = useCrudContext()
  return (
    <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.meta._thedah_featured_images.map((i) => (
        <img key={i.id} src={i.mediumUrl} alt={post.title} />
      ))}
      <button
        onClick={() => {
          setIsDeleting(true)
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          setIsEditing(true)
        }}
      >
        Edit
      </button>
    </div>
  )
}
