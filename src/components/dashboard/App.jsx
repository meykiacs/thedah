import { Box, Container } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import ResourceList from "./ResourceList"
import { PaperForm } from "../dashboard/PaperForm"
import { BookForm } from "../dashboard/BookForm"
import { AboutForm } from "../dashboard/AboutForm"
import { SinglePostForm } from "./SinglePostForm"
import { PostList } from "./SinglePostList"

export default function App() {
  const FORM_MAP = {
    paper: PaperForm,
    book: BookForm,
    about: AboutForm,
    singlepost: SinglePostForm,
  }
  const { resourceName, resourceHuman } = useResourceContext()
  const Form = FORM_MAP[resourceName]

  return (
    <Container>
      <Box mb={20}>
        <Form maxImages={3} />
      </Box>
      {resourceName !== "about" && resourceName !== "singlepost" && (
        <ResourceList
          resourceName={resourceName}
          resourceHuman={resourceHuman}
        />
      )}
      {resourceName === "singlepost" && <PostList postType="singlepost" />}
    </Container>
  )
  // )
}
