import { Box } from "@mantine/core"
import BookForm from "./BookForm"
import BookList from "./BookList"
import { EditContextProvider } from "../../context/EditContext"

export default function App() {
  return (
    <EditContextProvider>
      <div>
        <Box mb={20}>
          <BookForm />
        </Box>
        <BookList />
      </div>
    </EditContextProvider>
  )
}
