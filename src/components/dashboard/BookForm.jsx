import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  SegmentedControl,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core"
import { useEffect, useRef, useState } from "@wordpress/element"
import { useTranslation } from "react-i18next"
import DynamicInput from "./DynamicInput"
import { useCrudContext } from "../../context/CrudContext"
import { ImageDropzone } from "./ImageDropZone"
import { ImageList } from "./ImageList"
import useLanguageContext from "../../context/useLanguageContext"

export function BookForm({ maxImages }) {
  const [availability, setAvailability] = useState("available")
  const [coAuthors, setCoAuthors] = useState([""])

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
    if (isEditing) {
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditing) {
      setCoAuthors(selectedPost?.meta?._thedah_book?.coauthors ?? [""])
      setAvailability(selectedPost?.meta?._thedah_book?.availability ?? 'available')
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing, selectedPost])

  const inputs = [
    { name: "title", placeholder: "Title", default: isEditing ? selectedPost?.title : "" },
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
                {isEditing ? t("EditBook") : t("NewBook")}
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
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              placeholder={t("Description")}
              label={t("Description")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="content"
              defaultValue={isEditing ? selectedPost?.content : ""}
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
