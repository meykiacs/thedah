import { useEffect, useRef } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
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
import { useCrudContext } from "../../context/CrudContext"
import { ImageDropzone } from "./ImageDropZone"
import { ImageList } from "./ImageList"

export function GalleryForm({ maxImages }) {
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const formRef = useRef(null)
  const {
    handleSubmit,
    isEditing,
    selectedPost,
    images,
    isCreatingOrUpdatingPost,
    setIsEditing,
  } = useCrudContext()

  // for the create form
  useEffect(() => {
    formRef.current.reset()
  }, [lang])
  useEffect(() => {
    setIsEditing(false)
  }, [])

  useEffect(() => {
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing !== null) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing, selectedPost])

  const inputs = [
    {
      name: "title",
      placeholder: "Title",
      default: isEditing ? selectedPost?.title : "",
    },
  ]

  const customHandleSubmit = (event) => {
    event.preventDefault()

    const meta = {
      _thedah_images: images,
    }
    handleSubmit(event, meta)
  }

  return (
    <Card withBorder radius="md" p={15}>
      <form
        onSubmit={(e) => {
          customHandleSubmit(e)
        }}
        ref={formRef}
      >
        <Flex wrap="wrap" gap={50} align="center">
          <Group noWrap align="center" spacing={40}>
            <Box w={200} pos="relative">
              <Title order={1} size="h2" mb="32px">
                {isEditing ? t("EditImage") : t("NewImage")}
              </Title>
              <ImageDropzone maxFiles={maxImages} />
            </Box>
            <Box pt={25}>
              {inputs.map((i) => (
                <TextInput
                  required
                  label={t(i.placeholder)}
                  key={i}
                  placeholder={t(i.placeholder)}
                  aria-label={t(i.placeholder)}
                  mb={15}
                  name={i.name}
                  defaultValue={i.default}
                />
              ))}
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              name="content"
              aria-label={t("Description")}
              placeholder={t("Description")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              defaultValue={selectedPost?.content ?? ""}
            />
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
                  loading={isCreatingOrUpdatingPost}
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
          </Stack>
        </Flex>
      </form>
    </Card>
  )
}
