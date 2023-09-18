import {
  Card,
  Image,
  Text,
  Group,
  Box,
  Center,
  Title,
  Flex,
  List,
  Button,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import useEditContext from "../../context/useEditContext"

export default function PaperCard({ r, isDeleting, setIsMediaDeleting, setIsDeleting }) {
  const {t} = useTranslation()
  const {setResource: setEditingResource} = useEditContext()
  return (
    <Card withBorder radius="md" p={0}>
      <Flex wrap="wrap" gap={50} justify="space-between">
        <Group noWrap spacing={25} align="start">
          <Center pos="relative">
            {r.featured_media_url ? (
              <Image
                src={r.featured_media_url}
                height={300}
                width={230}
                alt={r.title}
              />
            ) : (
              <Image src={null} height={300} width={230} withPlaceholder />
            )}
            {/* <Badge pos="absolute" bottom={5}>
              {book.meta._thedah_book.availability}
            </Badge> */}
          </Center>
          <Box pt={25}>
            <Title order={4} color="blue.5" mb={5}>
              {r.title}
            </Title>
            <List listStyleType="none" spacing="xs">
              <List.Item fz="sm">
                {t("Author")}: {r.meta._thedah_paper.author}
              </List.Item>
              <List.Item>
                {t("CoAuthors")}:
                {r.meta._thedah_paper.coauthors &&
                  r.meta._thedah_paper.coauthors.map((author) => (
                    <span key={author}> {author}</span>
                  ))}
              </List.Item>
              <List.Item>
                {t("Publisher")}: {r.meta._thedah_paper.publisher}
              </List.Item>
              <List.Item>
                {t("Link")}: {r.meta._thedah_paper.link}
              </List.Item>


            </List>
          </Box>
        </Group>
        <Box pt={25}>
          <Text>{t('Summary ')}: {r.meta._thedah_paper.summary}</Text>
        </Box>
        <Box pt={25}>
          <Text>{r.content}</Text>
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
            if (r.featured_media > 0) {
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
            setEditingResource(r)
          }}
        >
          {t("Edit")}
        </Button>
      </Box>
    </Card>
  )
}
