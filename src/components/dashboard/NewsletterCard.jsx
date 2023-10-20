import {
  Card,
  Box,
  Title,
  List,
  Button,
  Container,
  Spoiler,
  Stack,
  Group,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import HTMLReactParser from "html-react-parser"
import { useState } from "@wordpress/element"
import useResourceContext from "../../context/useResourceContext"

export default function NewsletterCard({ post }) {
  const { t } = useTranslation()
  const { isDeleting, deletePost, setIsEditing } = useCrudContext()
  const { resources, restNonce } = useResourceContext()
  const { restUrl } = resources.newsletter
  const [isSent, setIsSent] = useState(post.meta._tdn_newsletter?.sent ?? false)
  const [isLoading, setIsLoading] = useState(false)
  console.log(post)
  const handleSend = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await fetch(`${restUrl}/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Nonce": restNonce,
      },
      body: JSON.stringify({
        meta: {
          _tdn_newsletter: {
            sent: true,
          },
        },
      }),
    })
    const data = await response.json()
    console.log(data)
    if (data.sent) {
      setIsSent(true)
    }
    setIsLoading(false)
  }
  return (
    <Card shadow="sm" radius="md">
      <Container size="xs">
        <Card.Section>
          <Stack noWrap spacing={25} align="start">
            <Title order={4} color="blue.5" mb={5}>
              {post.title}
            </Title>
            <List listStyleType="none" spacing="xs">
              <List.Item fz="sm">
                {t("sent")}:{" "}
                {post.meta._tdn_newsletter?.sent
                  ? post.meta._tdn_newsletter?.sent
                  : "false"}
              </List.Item>
            </List>
          </Stack>
          <Box pt={25}>
            <Title order={4}>{t("Content")}</Title>
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              {HTMLReactParser(post.content)}
            </Spoiler>
          </Box>
        </Card.Section>
        <Card.Section>
          <Stack>
            <Group>
              <Button
                loading={isLoading || isDeleting}
                disabled={isSent}
                color="red"
                onClick={() => {
                  deletePost(post.id)
                }}
              >
                {t("Remove")}
              </Button>
              <Button
                loading={isLoading || isDeleting}
                disabled={isSent}
                color="green"
                onClick={() => {
                  setIsEditing(true)
                }}
              >
                {t("Edit")}
              </Button>
            </Group>

            <Button
              disabled={isSent}
              loading={isLoading || isDeleting}
              color="green"
              onClick={handleSend}
            >
              {t("Send")}
            </Button>
          </Stack>
        </Card.Section>
      </Container>
    </Card>
  )
}
