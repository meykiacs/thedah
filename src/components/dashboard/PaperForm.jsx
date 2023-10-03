import { useEffect, useRef, useState } from "@wordpress/element"
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
import DynamicInput from "./DynamicInput"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import { ImageDropzone } from "./ImageDropZone"
import { ImageList } from "./ImageList"

export function PaperForm({maxImages}) {
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

  const [coAuthors, setCoAuthors] = useState([""])

  // for the create form
  useEffect(() => {
    formRef.current.reset()
  }, [lang])

  useEffect(() => {
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing !== null) {
      setCoAuthors(selectedPost?.meta?._thedah_paper?.coauthors ?? [""])

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
    {
      name: "author",
      placeholder: "Author",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.author : "",
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.publisher : "",
    },
    {
      name: "year",
      placeholder: "Year",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.year : "",
    },
    {
      name: "link",
      placeholder: "Link",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.link : "",
    },
  ]

  const customHandleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const meta = {
      _thedah_paper: {
        publisher: formData.get("publisher"),
        year: formData.get("year"),
        author: formData.get("author"),
        coauthors: coAuthors,
        summary: formData.get("summary"),
        link: formData.get("link"),
      },
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
                {isEditing ? t("EditPaper") : t("NewPaper")}
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
              <DynamicInput
                inputs={coAuthors}
                setInputs={setCoAuthors}
                label={t("CoAuthor")}
              />
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              aria-label={t("Summary")}
              placeholder={t("Summary")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="summary"
              defaultValue={selectedPost?.meta?._thedah_paper?.summary ?? ""}
            />
            <Textarea
              // label="Autosize with 4 rows max"
              placeholder={t("Content")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="content"
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
