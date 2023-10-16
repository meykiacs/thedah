import { CommentCard } from "./CommentCard"

export const CommentList = ({cl}) => {
  return (
    <>
      {cl.map((c) => (
        <CommentCard key={c.id} c={c} />
      ))}
    </>
  )
}
