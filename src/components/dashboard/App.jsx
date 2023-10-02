import { Box, Container } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import { PaperForm } from "../dashboard/PaperForm"
import { BookForm } from "../dashboard/BookForm"
import { AboutForm } from "../dashboard/AboutForm"
import { BlogForm } from "./BlogForm"
import { PostList } from "./PostList"

export default function App() {
  const FORM_MAP = {
    paper: PaperForm,
    book: BookForm,
    about: AboutForm,
    blog: BlogForm,
  }
  const { resourceName, resourceHuman } = useResourceContext()
  const Form = FORM_MAP[resourceName]

  return (
    <Container>
      <Box mb={20}>
        <Form maxImages={3} />
      </Box>
      {resourceName !== "about" && (
        <PostList resourceName={resourceName} resourceHuman={resourceHuman} />
      )}
    </Container>
  )
  // )
}
