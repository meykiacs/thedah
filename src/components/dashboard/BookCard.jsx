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

export function BookCard({ book }) {
  const { t } = useTranslation()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)
  const { bookRestUrlFa, bookRestUrlEn, mediaRestUrl } = useWPContext()
  const { setBooksFa, setBooksEn } = useBooksContext()
  const [deleteResponseData, deleteError] = useDelete({
    id: book.id,
    isDeleting,
    setIsDeleting,
    restUrl: book.type === "thedah_book" ? bookRestUrlEn : bookRestUrlFa,
  })
  const [deleteMediaResponseData, deleteMediaError] = useDelete({
    id: book.pictureId,
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
            {book.picture ? (
              <Image
                src={book.picture}
                height={300}
                width={230}
                alt={book.title}
              />
            ) : (
              <Image src={null} height={300} width={230} withPlaceholder />
            )}
            <Badge pos="absolute" bottom={5}>
              {book.meta.availability}
            </Badge>
          </Center>
          <Box pt={25}>
            <Title order={4} color="blue.5" mb={5}>
              {book.title}
            </Title>
            <List listStyleType="none" spacing="xs">
              <List.Item fz="sm">
                {t("Author")}: {book.meta.author}
              </List.Item>
              <List.Item>
                {t("CoAuthors")}:
                {book.meta.coauthors &&
                  book.meta.coauthors.map((author) => (
                    <span key={author}> {author}</span>
                  ))}
              </List.Item>
              <List.Item>
                {t("Publisher")}: {book.meta.publisher}
              </List.Item>

              <List.Item>
                {t("Edition")}: {book.meta.edition}
              </List.Item>
              <List.Item>
                {t("numberOfPages")}: {book.meta.numberOfPages}
              </List.Item>
              <List.Item>
                {t("ISBN")}: {book.meta.isbn}
              </List.Item>
              <List.Item>
                {t("Price")}: {book.meta.price} {t("T")}
              </List.Item>
            </List>
          </Box>
        </Group>
        <Box pt={25}>
          <Text>{book.description}</Text>
        </Box>
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
        </Box>
      </Flex>
    </Card>
  )
}
