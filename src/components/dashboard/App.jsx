import { Box } from "@mantine/core"
import useResourceContext from "../../context/useResourceContext"
import ResourceList from "./ResourceList"
import ResourceForm from "./ResourceForm"

export default function App() {
  const { resourceName } = useResourceContext()
    return <>
      <Box mb={20}>
        <ResourceForm />
      </Box>
      {resourceName !== 'about' && <ResourceList resourceName={resourceName} />}
    </>
  // )
}
