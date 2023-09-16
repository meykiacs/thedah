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
import { useEffect, useState } from "@wordpress/element"
import { useTranslation } from "react-i18next"
import useDelete from "../../hooks/useDelete"
import useWPContext from "../../context/useWPContext"
import useBooksContext from "../../context/useBooksContext"
import useEditContext from "../../context/useEditContext"

export function BookCard({ book }) {
  const { t } = useTranslation()
  const { setBooksFa, setBooksEn } = useBooksContext()
  const { bookRestUrlFa, bookRestUrlEn, mediaRestUrl } = useWPContext()
  const { setResource } = useEditContext()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)

  const [deleteResponseData, deleteError] = useDelete({
    id: book.id,
    isDeleting,
    setIsDeleting,
    restUrl: book.type === "thedah_book" ? bookRestUrlEn : bookRestUrlFa,
  })
  const [deleteMediaResponseData, deleteMediaError] = useDelete({
    id: book.featured_media,
    isDeleting: isMediaDeleting,
    setIsDeleting: setIsMediaDeleting,
    restUrl: mediaRestUrl,
  })

  if (deleteMediaResponseData) {
    console.log(deleteMediaResponseData)
  }

  useEffect(() => {
    if (deleteResponseData) {
      const bookId = deleteResponseData.previous.id
      if (book.type === "thedah_book") {
        setBooksEn((prev) => prev.filter((b) => b.id !== bookId))
      } else if (book.type === "thedah_bookfa") {
        setBooksFa((prev) => prev.filter((b) => b.id !== bookId))
      } else {
        throw new Error("Unknown book type")
      }
      // }
    }
  }, [book, deleteResponseData, setBooksEn, setBooksFa])

  if (deleteError) {
    console.log(deleteError)
  }
  if (deleteMediaError) {
    console.log(deleteMediaError)
  }

  return (
    <Card withBorder radius="md" p={0}>
      <Flex wrap="wrap" gap={50} justify="space-between">
        <Group noWrap spacing={25} align="start">
          <Center pos="relative">
            {book.featured_media_url ? (
              <Image
                src={book.featured_media_url}
                height={300}
                width={230}
                alt={book.title}
              />
            ) : (
              <Image src={null} height={300} width={230} withPlaceholder />
            )}
            <Badge pos="absolute" bottom={5}>
              {book.meta._thedah_book.availability}
            </Badge>
          </Center>
          <Box pt={25}>
            <Title order={4} color="blue.5" mb={5}>
              {book.title}
            </Title>
            <List listStyleType="none" spacing="xs">
              <List.Item fz="sm">
                {t("Author")}: {book.meta._thedah_book.author}
              </List.Item>
              <List.Item>
                {t("CoAuthors")}:
                {book.meta._thedah_book.coauthors &&
                  book.meta._thedah_book.coauthors.map((author) => (
                    <span key={author}> {author}</span>
                  ))}
              </List.Item>
              <List.Item>
                {t("Publisher")}: {book.meta._thedah_book.publisher}
              </List.Item>

              <List.Item>
                {t("Edition")}: {book.meta._thedah_book.edition}
              </List.Item>
              <List.Item>
                {t("numberOfPages")}: {book.meta._thedah_book.numberOfPages}
              </List.Item>
              <List.Item>
                {t("ISBN")}: {book.meta._thedah_book.isbn}
              </List.Item>
              <List.Item>
                {t("Price")}: {book.meta._thedah_book.price} {t("T")}
              </List.Item>
            </List>
          </Box>
        </Group>
        <Box pt={25}>
          <Text>{book.content}</Text>
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
            if (book.pictureId > 0) {
              setIsMediaDeleting(true)
            }
            setIsDeleting(true)
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
            setResource(book)
          }}
        >
          {t("Edit")}
        </Button>
      </Box>
    </Card>
  )
}
