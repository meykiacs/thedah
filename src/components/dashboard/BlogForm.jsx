import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import { ImageDropzone } from "./ImageDropZone"
import { ImageList } from "./ImageList"
import { useEffect, useRef, useState } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
import { BlogRichText } from "./BlogRichText"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"

export const BlogForm = ({ maxImages }) => {
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const formRef = useRef(null)
  const {
    selectedPost,
    isEditing,
    setIsEditing,
    handleSubmit,
    images,
    isCreatingOrUpdatingPost,
  } = useCrudContext()

  // controlled inputs
  const [feature, setFeature] = useState("none")
  const [blogtype, setBlogtype] = useState("article")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: isEditing && selectedPost?.content ? selectedPost.content : "",
  })

  const customHandleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const meta = {
      _thedah_images: images,
      _thedah_blog: {
        feature,
        blogtype,
        linkToFeature: formData.get("linkToFeature"),
      },
    }
    const content = editor.getHTML()
    handleSubmit(event, meta, "", content)
  }

  // for the create form
  useEffect(() => {
    formRef.current.reset()
  }, [lang])

  useEffect(() => {
    if (!isCreatingOrUpdatingPost) {
      formRef.current.reset()
      setFeature("none")
      setBlogtype("article")
    }
  }, [isCreatingOrUpdatingPost])

  useEffect(() => {
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    } else {
      setFeature("none")
      setBlogtype("article")
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing) {
      setFeature(selectedPost?.meta?._thedah_blog?.feature ?? "none")
      setBlogtype(selectedPost?.meta?._thedah_blog?.blogtype ?? "article")
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
      <form onSubmit={(event) => customHandleSubmit(event)} ref={formRef}>
        <Flex wrap="wrap" gap={50} align="center">
          <Group noWrap align="center" spacing={40}>
            <Box w={200} pos="relative">
              <Title order={1} size="h2" mb="32px">
                {isEditing ? t("editPost") : t("newPost")}
              </Title>
              <ImageDropzone maxFiles={maxImages} />
            </Box>
            <Stack pt={25}>
              <TextInput
                required
                label={t("Title")}
                placeholder={t("Title")}
                aria-label={t("Title")}
                mb={15}
                name="title"
                defaultValue={
                  isEditing && selectedPost?.title ? selectedPost.title : ""
                }
              />
              <TextInput
                label={t("linkToFeature")}
                placeholder={t("linkToFeature")}
                aria-label={t("linkToFeature")}
                mb={15}
                name="linkToFeature"
                defaultValue={
                  isEditing && selectedPost?.meta?._thedah_blog?.linkToFeature ? selectedPost?.meta?._thedah_blog?.linkToFeature : ""
                }
              />
              <SegmentedControl
                name="feature"
                value={feature}
                data={[
                  { label: t("None"), value: "none" },
                  { label: t("Enroll"), value: "enroll" },
                  { label: t("Purchase"), value: "purchase" },
                  { label: t("PrePurchase"), value: "prepurchase" },
                ]}
                aria-label={t("Feature")}
                onChange={setFeature}
                defaultValue={
                  selectedPost?.meta?._thedah_blog?.feature ?? "none"
                }
              />
              <SegmentedControl
                name="blogtype"
                value={blogtype}
                data={[
                  { label: t("Article"), value: "article" },
                  { label: t("News"), value: "news" },
                  { label: t("Event"), value: "event" },
                  { label: t("Interview"), value: "interview" },
                ]}
                aria-label={t("Blog Type")}
                onChange={setBlogtype}
                defaultValue={
                  selectedPost?.meta?._thedah_blog?.blogtype ?? "article"
                }
              />
            </Stack>
          </Group>
          <Stack pt={25} spacing={50} align="center">

            <BlogRichText
              editor={editor}
              label={t("Content")}
              placeholder={t("Content")}
              autosize
              minHeight={120} // minRows equivalent
              maxHeight={240} // maxRows equivalent
              onChange={(value) => {
                formRef.current.elements.content.value = value
              }}
            />
          </Stack>
        </Flex>
        <input type="hidden" name="content" />
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
      </form>
    </Card>
  )
}
