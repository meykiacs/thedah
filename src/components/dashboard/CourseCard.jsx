import {
  Card,
  Text,
  Group,
  Badge,
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

export function CourseCard({ post, images }) {
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
                  <a href={i.mediumUrl}>File</a>
                  <Badge pos="absolute" bottom={5}>
                    {post.meta._thedah_course.availability}
                  </Badge>
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
                  <List.Item>
                    {t("Teacher")}: {post.meta._thedah_course.teacher}
                  </List.Item>
                  <List.Item>
                    {t("CoTeachers")}:
                    {post.meta._thedah_course.coTeachers &&
                      post.meta._thedah_course.coTeachers.map((t) => (
                        <span key={t}> {t}</span>
                      ))}
                  </List.Item>

                  <List.Item>
                    {t("Duration")}: {post.meta._thedah_course.duration}
                  </List.Item>
                  <List.Item>
                    {t("Price")}: {post.meta._thedah_course.price} {t("T")}
                  </List.Item>
                  <List.Item>
                    {t("Organizer")}: {post.meta._thedah_course.organizer}
                  </List.Item>
                  <List.Item>
                    {t("courseType")}: {post.meta._thedah_course.courseType}
                  </List.Item>
                </List>
              </Box>
            </Group>
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
