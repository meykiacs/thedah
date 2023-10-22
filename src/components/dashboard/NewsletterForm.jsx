import { useEffect, useRef } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
import {
  Button,
  Card,
  Flex,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { BlogRichText } from "./BlogRichText"

export function NewsletterForm() {
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const formRef = useRef(null)
  const {
    handleSubmit,
    isEditing,
    selectedPost,
    isCreatingOrUpdatingPost,
    setIsEditing,
  } = useCrudContext()

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
      name: "title",
      placeholder: "Title",
      default: isEditing ? selectedPost?.title : "",
    },
  ]

  const customHandleSubmit = (event) => {
    event.preventDefault()

    const meta = {}

    const content = editor.getHTML()
    handleSubmit(event, meta, "", content)
  }

  // for the create form
  useEffect(() => {
    formRef.current.reset()
  }, [lang])
  useEffect(() => {
    setIsEditing(false)
  },[])

  useEffect(() => {
    if (!isCreatingOrUpdatingPost) {
      formRef.current.reset()
    }
  }, [isCreatingOrUpdatingPost])

  useEffect(() => {
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing])

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
            {isEditing ? t("editNewsletter") : t("newNewsletter")}
          </Title>
          <Flex pt={25} wrap="wrap" gap="15px" align="center" justify="center">
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
          </Flex>
          <Stack pt={25} spacing={50} align="center">
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
