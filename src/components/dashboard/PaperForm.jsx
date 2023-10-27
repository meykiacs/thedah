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
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { BlogRichText } from "./BlogRichText"

export function PaperForm({ maxImages }) {
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
  const extensions = [
    StarterKit,
    Underline,
    Link,
    Superscript,
    Subscript,
    Highlight,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ]

  const editor = useEditor({
    extensions,
    content: isEditing && selectedPost?.content ? selectedPost.content : "",
  })

  const inputs = [
    {
      name: "fullReference",
      placeholder: "fullReference",
      default: isEditing ? selectedPost?.meta?._thedah_paper.fullReference : "",
      required: true
    },
    {
      name: "title",
      placeholder: "Title",
      default: isEditing ? selectedPost?.title : "",
      required: true
    },
    {
      name: "author",
      placeholder: "Author",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.author : "",
      required: true
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.publisher : "",
      required: true
    },
    {
      name: "year",
      placeholder: "Year",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.year : "",
      required: true
    },
    {
      name: "link",
      placeholder: "Link",
      default: isEditing ? selectedPost?.meta?._thedah_paper?.link : "",
      required: false
    },
  ]

  const customHandleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const meta = {
      _thedah_paper: {
        publisher: formData.get("publisher"),
        fullReference: formData.get("fullReference"),
        year: formData.get("year"),
        author: formData.get("author"),
        coauthors: coAuthors,
        summary: formData.get("summary"),
        link: formData.get("link"),
      },
      _thedah_images: images,
    }

    const content = editor.getHTML()
    handleSubmit(event, meta, "", content)
  }

  // for the create form
  useEffect(() => {
    formRef.current.reset()
  }, [lang])

  useEffect(() => {
    setIsEditing(false)
  }, [])

  useEffect(() => {
    if (!isCreatingOrUpdatingPost) {
      formRef.current.reset()
      setCoAuthors([""])
    }
  }, [isCreatingOrUpdatingPost])

  useEffect(() => {
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    } else {
      setCoAuthors([""])
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing) {
      setCoAuthors(selectedPost?.meta?._thedah_paper?.coauthors ?? [""])
    }
  }, [isEditing, selectedPost])

  useEffect(() => {
    if (editor && isEditing) {
      editor.commands.setContent(
        selectedPost?.content ? selectedPost.content : "",
      )
    } else if (editor) {
      editor.commands.setContent("")
    }
  }, [isEditing, editor, selectedPost])

  return (
    <Card withBorder radius="md" p={15}>
      <form
        onSubmit={(e) => {
          customHandleSubmit(e)
        }}
        ref={formRef}
      >
        <Flex wrap="wrap" gap={50} align="center" direction="column">
          <Title order={1} size="h2" mb="32px">
            {isEditing ? t("editPaper") : t("newPaper")}
          </Title>
          <Box w={200} pos="relative">
            <ImageDropzone maxFiles={maxImages} />
          </Box>
          <Flex gap={20} wrap="wrap">
            <ImageList images={images} />
          </Flex>
          <Flex pt={25} wrap="wrap" gap="15px" align="center" justify="center">
            {inputs.map((i) => (
              <TextInput
                required={i.required}
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
          </Flex>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              aria-label={t("Summary")}
              placeholder={t("Summary")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="summary"
              defaultValue={
                isEditing ? selectedPost?.meta?._thedah_paper?.summary : ""
              }
            />
            <BlogRichText
              editor={editor}
              label={t("Content")}
              placeholder={t("Content")}
              autosize
              minHeight={120} // minRows equivalent
              maxHeight={240} // maxRows equivalent
            />

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
