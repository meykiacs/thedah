import { Box, Container } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import { PaperForm } from "../dashboard/PaperForm"
import { BookForm } from "../dashboard/BookForm"
import { AboutForm } from "../dashboard/AboutForm"
import { BlogForm } from "./BlogForm"
import { PostList } from "./PostList"
import { CourseForm } from "./CourseForm"

export default function App() {
  const FORM_MAP = {
    paper: {
      component: PaperForm,
      maxImages: 1,
    },
    book: {
      component: BookForm,
      maxImages: 1,
    },
    about: {
      component: AboutForm,
      maxImages: 1,
    },
    blog: {
      component: BlogForm,
      maxImages: 3,
    },
    course: {
      component: CourseForm,
      maxImages: 1,
    },
  }
  const { resourceName, resourceHuman } = useResourceContext()
  const Form = FORM_MAP[resourceName].component
  const maxImages = FORM_MAP[resourceName].maxImages

  return (
    <Container>
      <Box mb={20}>
        <Form maxImages={maxImages} />
      </Box>
      {resourceName !== "about" && (
        <PostList resourceName={resourceName} resourceHuman={resourceHuman} />
      )}
    </Container>
  )
  // )
}
