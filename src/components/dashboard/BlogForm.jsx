import { useCrudContext } from "../../context/CrudContext"
import { ImageList } from "./ImageList"
import { ImageDropzone } from "./ImageDropZone"
import { useHandleSubmit } from "../../hooks/useHandleSubmit"
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useGetPostById } from "../../hooks/useGetPostById"

export const BlogForm = ({ maxImages }) => {
  const {
    selectedPostId,
    isEditing,
    setIsEditing,
    images,
    isCreatingOrUpdatingPost,
  } = useCrudContext()
  const { t } = useTranslation()
  const handleSubmit = useHandleSubmit()

  const selectedPost = useGetPostById(selectedPostId)
  const meta = {
    _thedah_images: images,
  }
  return (
    <Card withBorder radius="md" p={15}>
      <form onSubmit={(event) => handleSubmit(event, meta)}>
        <Flex wrap="wrap" gap={50} align="center">
          <Group noWrap align="center" spacing={40}>
            <Box w={200} pos="relative">
              <Title order={1} size="h2" mb="32px">
                {isEditing ? t("EditPost") : t("NewPost")}
              </Title>
              <ImageDropzone maxFiles={maxImages} />
            </Box>
            <Box pt={25}>
              <TextInput
                label={t("Title")}
                placeholder={t("Title")}
                aria-label={t("Title")}
                mb={15}
                name="title"
                defaultValue={
                  isEditing && selectedPost?.title ? selectedPost.title : ""
                }
              />
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              label={t("Content")}
              aria-label={t("Content")}
              placeholder={t("Content")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="content"
              defaultValue={
                isEditing && selectedPost?.content ? selectedPost.content : ""
              }
            />
          </Stack>
        </Flex>

        <Flex gap={20} wrap="wrap">
          <ImageList images={images} />
        </Flex>

        <Group mt="24px" justify="center">
          <Button
            type="submit"
            loading={isCreatingOrUpdatingPost}
            color="green"
          >
            {t("Submit")}
          </Button>
          {isEditing && (
            <Button
              color="red"
              onClick={(e) => {
                e.preventDefault()
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
          )}
        </Group>
      </form>
    </Card>
  )
}
