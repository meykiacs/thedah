import { Stack } from "@mantine/core"
import { ResourceCard } from "./ResourceCard"
import useResourceList from "../../hooks/useResourceList"

export default function ResourceList({ resourceName }) {
  const rs = useResourceList(resourceName)
  return (
    <Stack maxW="container.md">
      {rs.map((r) => (
        <ResourceCard r={r} key={r.id} resourceName={resourceName} />
      ))}
    </Stack>
  )
}
