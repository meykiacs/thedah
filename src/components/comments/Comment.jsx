import styled from "@emotion/styled"
import { useCommentContext } from "../../context/CommentContext"
import { Section } from "../common/Section"
import { AllCommentsButton } from "./AllCommentsButton"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { mq } from "../../utils/mq"

export const Comment = () => {
  const { allComments, writtenComments } = useCommentContext()
  return (
    <Section>
      <Wrapper>
        <CommentForm />
        <CommentList cl={writtenComments} />
        <AllCommentsButton />
        <CommentList cl={allComments} />
      </Wrapper>
    </Section>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 350px;
  ${mq("md")} {
    width: 595px;
  }

`
