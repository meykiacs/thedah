import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Spoiler,
  Text,
  Title,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import HTMLReactParser from "html-react-parser"

export const BlogCard = ({ post, images }) => {
  const { setIsEditing, deletePost } = useCrudContext()
  const { t } = useTranslation()
  return (
    <Card shadow="sm" radius="md">
      <Container size="xs">
        <Card.Section withBorder inheritPadding>
          <SimpleGrid cols={images.length}>
            {images.length > 0 &&
              images.map((i) => (
                <Box key={i.id} w="150px">
                  <Image src={i.mediumUrl ? i.mediumUrl : i.fullUrl} alt={post.title} />
                </Box>
              ))}
          </SimpleGrid>
        </Card.Section>
        <Card.Section>
          <Title order={2} size="h6" my={8}>
            {t("Title")}{" "}
            <Text span size="xl" color="pink.7">
              {post.title}
            </Text>
          </Title>
          <a href={post.permalink} target="_blank" rel="noreferrer">{t('link')}</a>
          <Title order={3} size="h6" mb={4}>
            {t("Content")}
          </Title>
          <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
            {HTMLReactParser(post.content)}
          </Spoiler>
        </Card.Section>
        <Group justify="center">
          <Button
            color="red"
            onClick={() => {
              deletePost(post.id)
            }}
          >
            {t("Delete")}
          </Button>
          <Button
            color="green"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            {t("Edit")}
          </Button>
        </Group>
      </Container>
    </Card>
  )
}
