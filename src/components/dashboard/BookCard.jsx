import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Box,
  Center,
  Title,
  Flex,
  List,
  Button,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import useWPContext from "../../context/useWPContext"
import { useCrudContext } from "../../context/CrudContext"

export function BookCard({ post }) {
  const { t } = useTranslation()
  const { assetsImagesUrl } = useWPContext()
  const { isDeleting, deletePost, setIsEditing } = useCrudContext()
  return (
    <Card withBorder radius="md" p={0}>
      <Flex wrap="wrap" gap={50} justify="space-between">
        <Group noWrap spacing={25} align="start">
          <Center pos="relative">
            <Image
              src={post.featured_media_url}
              height={300}
              width={230}
              alt={post.title}
              fallbackSrc={`${assetsImagesUrl}/image-placeholder.svg`}
            />
            <Badge pos="absolute" bottom={5}>
              {post.meta._thedah_book.availability}
            </Badge>
          </Center>
          <Box pt={25}>
            <Title order={4} color="blue.5" mb={5}>
              {post.title}
            </Title>
            <List listStyleType="none" spacing="xs">
              <List.Item fz="sm">
                {t("Author")}: {post.meta._thedah_book.author}
              </List.Item>
              <List.Item>
                {t("CoAuthors")}:
                {post.meta._thedah_book.coauthors &&
                  post.meta._thedah_book.coauthors.map((author) => (
                    <span key={author}> {author}</span>
                  ))}
              </List.Item>
              <List.Item>
                {t("Publisher")}: {post.meta._thedah_book.publisher}
              </List.Item>

              <List.Item>
                {t("Edition")}: {post.meta._thedah_book.edition}
              </List.Item>
              <List.Item>
                {t("numberOfPages")}: {post.meta._thedah_book.numberOfPages}
              </List.Item>
              <List.Item>
                {t("ISBN")}: {post.meta._thedah_book.isbn}
              </List.Item>
              <List.Item>
                {t("Price")}: {post.meta._thedah_book.price} {t("T")}
              </List.Item>
            </List>
          </Box>
        </Group>
        <Box pt={25}>
          <Text>{post.content}</Text>
        </Box>
      </Flex>
      <Box pos="relative" miw="200px" mih="200px">
        <Button
          color="red"
          pos="absolute"
          bottom="40px"
          right="55px"
          loading={isDeleting}
          onClick={() => {
            deletePost(post.id)
          }}
        >
          {t("Remove")}
        </Button>
        <Button
          color="green"
          pos="absolute"
          bottom="40px"
          right="250px"
          onClick={() => {
            setIsEditing(true)
          }}
        >
          {t("Edit")}
        </Button>
      </Box>
    </Card>
  )
}
