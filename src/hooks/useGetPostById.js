import useResourceContext from "../context/useResourceContext"
import useResourceList from "./useResourceList"

export const useGetPostById = (id) => {
  const { resourceName } = useResourceContext()
  const rs = useResourceList(resourceName)
  return rs.find((r) => id === r.id) ?? null
}
