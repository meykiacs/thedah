import useResourceList from "../../hooks/useResourceList"
import { SinglePostCard } from "./SinglePostCard"

export function SinglePostList() {
  const { resources } = useResourceList()
  const { singlePosts } = resources

  return (
    <>
      {singlePosts.map((post) => (
        <SinglePostCard key={post.id} />
      ))}
    </>
  )
}
