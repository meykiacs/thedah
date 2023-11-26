import { Box, Container } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import { PaperForm } from "../dashboard/PaperForm"
import { BookForm } from "../dashboard/BookForm"
import { AboutForm } from "../dashboard/AboutForm"
import { BlogForm } from "./BlogForm"
import { PostList } from "./PostList"
import { CourseForm } from "./CourseForm"
import { GalleryForm } from "./GalleryForm"
import { NewsletterForm } from "./NewsletterForm"
import { SocialForm } from "./SocialForm"
import { SliderForm } from "./SliderForm"
import { QuoteForm } from "./QuoteForm"

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
      maxImages: 2,
    },
    course: {
      component: CourseForm,
      maxImages: 1,
    },
    gallery: {
      component: GalleryForm,
      maxImages: 1,
    },
    newsletter: {
      component: NewsletterForm,
      maxImages: 1,
    },
    social: {
      component: SocialForm,
      maxImages: 1,
    },
    quote: {
      component: QuoteForm,
      maxImages: 1,
    },
    slider: {
      component: SliderForm,
      maxImages: 3,
    },
  }
  const { resourceName, resourceHuman, singleResources } = useResourceContext()
  let Form, maxImages
  if (resourceName !== "unapprovedComments" && resourceName !== "approvedComments") {
    Form = FORM_MAP[resourceName].component
    maxImages = FORM_MAP[resourceName].maxImages
  }
  return (
    <Container>
      {(resourceName !== "unapprovedComments" && resourceName !== "approvedComments") && (
        <Box mb={20}>
          <Form maxImages={maxImages} />
        </Box>
      )}
      {!singleResources.includes(resourceName) && (
        <PostList resourceName={resourceName} resourceHuman={resourceHuman} />
      )}
    </Container>
  )
}
