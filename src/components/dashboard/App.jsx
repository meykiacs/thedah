import { Box } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import ResourceList from "./ResourceList"
import { PaperForm } from "../dashboard/PaperForm"
import { BookForm } from "../dashboard/BookForm"
import { AboutForm } from "../dashboard/AboutForm"

export default function App() {
  const FORM_MAP = {
    paper: PaperForm,
    book: BookForm,
    about: AboutForm,
  }

  const { resourceName } = useResourceContext()
  const Form = FORM_MAP[resourceName]
  return (
    <>
      <Box mb={20}>
        <Form />
      </Box>
      {resourceName !== "about" && <ResourceList resourceName={resourceName} />}
    </>
  )
  // )
}
