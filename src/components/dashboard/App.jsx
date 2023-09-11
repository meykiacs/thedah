import { Box } from "@mantine/core"
import BookForm from "./BookForm"
import BookList from "./BookList"

export default function App() {
  return (
    <div>
      <Box mb={20}>
        <BookForm />
      </Box>
      <BookList />
    </div>
  )
}
