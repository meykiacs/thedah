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
  Spoiler,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import HTMLReactParser from "html-react-parser"

export default function PaperCard({ post, images }) {
  const { t } = useTranslation()
  const { isDeleting, deletePost, setIsEditing } = useCrudContext()
  return (
    <Card shadow="sm" radius="md">
      <Container size="xs">
        <Card.Section withBorder inheritPadding>
          <SimpleGrid cols={images.length}>
            {images.length > 0 &&
              images.map((i) => (
                <Center key={i.id} pos="relative">
                  <Image
                    src={i.mediumUrl ? i.mediumUrl : (i.source_url ?? '')}
                    alt={post.title}
                    h={300}
                    w={230}
                  />
                </Center>
              ))}
          </SimpleGrid>
        </Card.Section>
        <Card.Section>
          <Flex direction="column" gap={50} justify="space-between">
            <Group noWrap spacing={25} align="start">
              <Box pt={25}>
                <Title order={4} color="blue.5" mb={5}>
                  {post.title}
                </Title>
                <List listStyleType="none" spacing="xs">
                  <List.Item fz="sm">
                    {t("fullReference")}:{" "}
                    {post.meta._thedah_paper.fullReference ?? ""}
                  </List.Item>
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
                    {t("externalLink")}:{" "}
                    <a
                      href={post.meta._thedah_paper.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {post.meta._thedah_paper.link}
                    </a>
                  </List.Item>
                  <List.Item>
                    {t("LinkToPage")}:{" "}
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {post.permalink}
                    </a>
                  </List.Item>
                </List>
              </Box>
            </Group>
            <Box pt={25}>
              <Text>
              <Title order={4}>{t('Summary')}</Title>
                {post.meta._thedah_paper.summary}
              </Text>
            </Box>
            <Box pt={25}>
              <Title order={4}>{t('Content')}</Title>
              <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                {HTMLReactParser(post.content)}
              </Spoiler>
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
