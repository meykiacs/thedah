import { Stack } from "@mantine/core"
import { BookCard } from "./BookCard"
import useResourceList from "../../hooks/useResourceList"

export default function BookList() {
  const books = useResourceList("book")


  return (
    <Stack maxW="container.md">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Stack>
  )
}
