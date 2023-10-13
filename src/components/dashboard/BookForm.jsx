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
import { useEffect, useRef, useState } from "@wordpress/element"
import { useTranslation } from "react-i18next"
import DynamicInput from "./DynamicInput"
import { useCrudContext } from "../../context/CrudContext"
import { ImageDropzone } from "./ImageDropZone"
import { ImageList } from "./ImageList"
import useLanguageContext from "../../context/useLanguageContext"
import { BlogRichText } from "./BlogRichText"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"

export function BookForm({ maxImages }) {
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
  const [availability, setAvailability] = useState("available")
  const [coAuthors, setCoAuthors] = useState([""])

  const inputs = [
    {
      name: "title",
      placeholder: "Title",
      default: isEditing ? selectedPost?.title : "",
    },
    {
      name: "author",
      placeholder: "Author",
      default: isEditing ? selectedPost?.meta?._thedah_book?.author : "",
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: isEditing ? selectedPost?.meta?._thedah_book?.publisher : "",
    },
    {
      name: "year",
      placeholder: "Year",
      default: isEditing ? selectedPost?.meta?._thedah_book?.year : "",
    },
    {
      name: "edition",
      placeholder: "Edition",
      default: isEditing ? selectedPost?.meta?._thedah_book?.edition : "",
    },
    {
      name: "numberOfPages",
      placeholder: "numberOfPages",
      default: isEditing ? selectedPost?.meta?._thedah_book?.numberOfPages : "",
    },
    {
      name: "isbn",
      placeholder: "ISBN",
      default: isEditing ? selectedPost?.meta?._thedah_book?.isbn : "",
    },
    {
      name: "price",
      placeholder: "Price",
      default: isEditing ? selectedPost?.meta?._thedah_book?.price : "",
    },
  ]

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
      _thedah_book: {
        publisher: formData.get("publisher"),
        year: formData.get("year"),
        author: formData.get("author"),
        edition: formData.get("edition"),
        isbn: formData.get("isbn"),
        price: formData.get("price"),
        availability,
        coauthors: coAuthors,
        numberOfPages: formData.get("numberOfPages"),
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
      setCoAuthors(selectedPost?.meta?._thedah_book?.coauthors ?? [""])
      setAvailability(
        selectedPost?.meta?._thedah_book?.availability ?? "available",
      )
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
            {isEditing ? t("editBook") : t("newBook")}
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
          </Flex>
          <SegmentedControl
            name="availability"
            value={availability}
            data={[
              { label: t("Available"), value: "available" },
              { label: t("Unavailable"), value: "unavailable" },
              { label: t("Soon"), value: "soon" },
            ]}
            aria-label={t("Availability")}
            onChange={setAvailability}
            defaultValue={
              selectedPost?.meta?._thedah_book?.availability ?? "available"
            }
          />
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
                  {t("Cancel")}
                </Button>
              )}
            </Group>
          </Stack>
        </Flex>
      </form>
    </Card>
  )
}
