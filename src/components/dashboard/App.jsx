import { Box } from "@mantine/core"
import BookForm from "./BookForm"
import BookList from "./BookList"
import useResourceContext from "../../context/useResourceContext"
import ResourceList from "./ResourceList"
import ResourceForm from "./ResourceForm"

export default function App() {
  const { resourceName } = useResourceContext()
  return resourceName === "book" ? (
    <>
      <Box mb={20}>
        <BookForm />
      </Box>
      <BookList />
    </>
  ) : (
    <>
      <Box mb={20}>
        <ResourceForm />
      </Box>
      {resourceName !== 'about' && <ResourceList />}
    </>
  )
}
