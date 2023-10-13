import { Accordion, LoadingOverlay } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import useResourceList from "../../hooks/useResourceList"
import { BlogCard } from "./BlogCard"
import { BookCard } from "./BookCard"
import PaperCard from "./PaperCard"
import { getImages } from "../../utils/wp"
import { CourseCard } from "./CourseCard"
import { GalleryCard } from "./GalleryCard"

export function PostList({ resourceName }) {
  const CARD_MAP = {
    paper: PaperCard,
    book: BookCard,
    blog: BlogCard,
    course: CourseCard,
    gallery: GalleryCard,
  }
  const Card = CARD_MAP[resourceName]

  const rs = useResourceList(resourceName)

  const { setSelectedPostId, isEditing, selectedPostId, isDeleting, images, isLocked } =
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
          <Accordion.Control
            disabled={isLocked}
            fz="1.25rem"
            pr="32px"
            pl="16"
            py="8px"
          >
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
            <Card post={post} images={getImages(post)} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
