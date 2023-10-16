import styled from "@emotion/styled"
import { IconUserCircle } from "@tabler/icons-react"
import { formatDistanceToNow } from "date-fns"
import HTMLReactParser from "html-react-parser"
export const CommentCard = ({ c }) => {
  return (
    <Wrapper>
      <CommentAuthor>
        <AuthorName>
          {c.author_name}
        </AuthorName>
        <IconUserCircle size={40} />
      </CommentAuthor>
      <CommentContent>{HTMLReactParser(c.content.rendered)}</CommentContent>
      <HumanTime>
      {formatDistanceToNow(new Date(c.date_gmt + 'Z'), { addSuffix: true })}
      </HumanTime>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: stretch;
`

const CommentAuthor = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const AuthorName = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  transform: translateY(2px);
`

const CommentContent = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const HumanTime = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
`
