import {
  Card,
  Group,
  Box,
  Title,
  Flex,
  List,
  Button,
  Container,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import useResourceContext from "../../context/useResourceContext"

const trimWords = (input, words, end) => {
  const split = input.split(' ')
  if (split.length > words) {
    return split.slice(0, words).join(' ') + end
  }
  return input
}

export function ApprovedCommentsCard({ post }) {
  const { t } = useTranslation()
  const { isDeleting, deletePost } = useCrudContext()
  const { restNonce, resources } = useResourceContext()
  const { restUrl, setR } = resources.approvedComments
  const {  setR : setRUnapproved } = resources.unapprovedComments

 
  // Function to disapprove the comment
  const disapproveComment = async () => {
    try {
      // Call your API to disapprove the comment
      const response = await fetch(`${restUrl}/${post.id}?_embed  `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify({ status: "hold" }),
      })

      const data = await response.json()
      const comment = {
        id: data.id,
        title: trimWords(data.content.raw, 4, '...'),
        content: data.content.raw,
        author: data.author_name,
        author_email: data.author_email,
        related_post: {
          title: data._embedded.up[0].title.rendered,
          permalink: data._embedded.up[0].link,
        },
      }

      // Update the list of approved comments
      setR((prevState) => prevState.filter((comment) => comment.id !== post.id))
      setRUnapproved((prevState) => [...prevState, comment])

    } catch (error) {
      console.error("Failed to disapprove the comment:", error)
    }
  }

  return (
    <Card shadow="sm" radius="md">
      <Container size="xs">
        <Card.Section>
          <Flex wrap="wrap" gap={50} justify="space-between">
            <Group noWrap spacing={25} align="start">
              <Box pt={25}>
                <a
                  href={post.related_post.permalink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Title order={4} color="blue.5" mb={5}>
                    {post.related_post.title}
                  </Title>
                </a>
                <List listStyleType="none" spacing="xs">
                  <List.Item>
                    {t("commentContent")}: {post.content}
                  </List.Item>
                  <List.Item>
                    {t("commentAuthor")}: {post.author}
                  </List.Item>
                  <List.Item>
                    {t("authorEmail")}: {post.author_email}
                  </List.Item>
                </List>
              </Box>
            </Group>
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
            color="orange"
            pos="absolute"
            bottom="40px"
            right="250px"
            onClick={disapproveComment}
          >
            {t("Disapprove")}
          </Button>
        </Box>
      </Container>
    </Card>
  )
}
