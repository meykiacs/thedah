import {
  Card,
  Image,
  Text,
  Group,
  Box,
  Center,
  Title,
  Flex,
  Button,
  Container,
  SimpleGrid,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"

export function GalleryCard({ post, images }) {
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
                    src={i.mediumUrl ? i.mediumUrl : i.source_url}
                    alt={post.title}
                    height={300}
                    width={230}
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
              </Box>
            </Group>
            <Box pt={25}>
              <Text>
                {t("Description")}: {post.content}
              </Text>
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
