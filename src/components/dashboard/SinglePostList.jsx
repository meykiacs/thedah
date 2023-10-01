import { Accordion, LoadingOverlay } from "@mantine/core"
import useResourceList from "../../hooks/useResourceList"
import { SinglePostCard } from "./SinglePostCard"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"

export function PostList({ postType }) {
  const rs = useResourceList(postType)
  const { setSelectedPostId, isEditing, selectedPostId, isDeleting } =
    useCrudContext()
  const { t } = useTranslation()
  return (
    <Accordion
      value={selectedPostId.toString()}
      onChange={(value) => setSelectedPostId(parseInt(value))}
      variant="contained"
    >
      {rs.map((post) => (
        <Accordion.Item key={post.id} value={post.id.toString()}>
          <Accordion.Control disabled={isEditing} fz='1.5rem' pr='32px' pl='16'>
            {post.title !== "" ? post.title : t("noTitle")}
          </Accordion.Control>
          <Accordion.Panel pos="relative">
            <LoadingOverlay
              visible={
                (isEditing && selectedPostId === post.id) ||
                (isDeleting && selectedPostId === post.id)
              }
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ color: "blue", type: "bars" }}
            />
            <SinglePostCard post={post} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
