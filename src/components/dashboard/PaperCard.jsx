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
  Container,
  SimpleGrid,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"

export default function PaperCard({ post, images }) {
  const { t } = useTranslation()
  const { isDeleting, deletePost, setIsEditing } = useCrudContext()
  console.log(post);
  return (
    <Card shadow="sm" radius="md">
      <Container size="xs">
        <Card.Section withBorder inheritPadding>
          <SimpleGrid cols={images.length}>
            {images.length > 0 &&
              images.map((i) => (
                <Center key={i.id} pos="relative">
                  <Image
                    src={i.mediumUrl}
                    alt={post.title}
                    height={300}
                    width={230}
                    // fallbackSrc={`${assetsImagesUrl}/image-placeholder.svg`}
                  />
                </Center>
              ))}
          </SimpleGrid>
        </Card.Section>
        <Card.Section>
          <Flex wrap="wrap" gap={50} justify="space-between">
            <Group noWrap spacing={25} align="start">
              <Box pt={25}>
                <Title order={4} color="blue.5" mb={5}>
                  {post.title}
                </Title>
                <List listStyleType="none" spacing="xs">
                  <List.Item fz="sm">
                    {t("Author")}: {post.meta._thedah_paper.author}
                  </List.Item>
                  <List.Item>
                    {t("CoAuthors")}:
                    {post.meta._thedah_paper.coauthors &&
                      post.meta._thedah_paper.coauthors.map((author) => (
                        <span key={author}> {author}</span>
                      ))}
                  </List.Item>
                  <List.Item>
                    {t("Publisher")}: {post.meta._thedah_paper.publisher}
                  </List.Item>

                  <List.Item>
                    {t("Year")}: {post.meta._thedah_paper.year}
                  </List.Item>
                  <List.Item>
                  {t("Link")}: <a href={post.meta._thedah_paper.link} target="_blank" rel="noreferrer">{post.meta._thedah_paper.link}</a>
                  </List.Item>
                </List>
              </Box>
            </Group>
            <Box pt={25}>
          <Text>{t('Summary ')}: {post.meta._thedah_paper.summary}</Text>
        </Box>
        <Box pt={25}>
          <Text>{post.content}</Text>
        </Box>
          </Flex>
        </Card.Section>

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
      </Container>
    </Card>
  )
}
      