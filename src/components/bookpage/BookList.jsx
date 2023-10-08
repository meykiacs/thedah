import { BookCard } from "./BookCard"
import styled from "@emotion/styled"
import useResourceList from "../../hooks/useResourceList"

export default function BookList() {
  const books = useResourceList("book")

  return (
    <Wrapper>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`
