import { Box } from "@mantine/core"
import BookForm from "./BookForm"
import BookList from "./BookList"
import { EditContextProvider } from "../../context/EditContext"
import useResourceContext from "../../context/useResourceContext"

export default function App() {
  const { resourceName } = useResourceContext()
  return (
    <EditContextProvider>
      {resourceName === "book" ? (
        <>
          <Box mb={20}>
            <BookForm />
          </Box>
          <BookList />
        </>
      ) : resourceName === "paper" ? (
        <></>
      ) : null}
    </EditContextProvider>
  )
}
