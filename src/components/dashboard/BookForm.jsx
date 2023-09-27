import {
  Card,
  Group,
  Box,
  Flex,
  TextInput,
  SegmentedControl,
  Textarea,
  Button,
  Stack,
} from "@mantine/core"
import PictureDrop from "./PictureDrop"
import { useEffect, useRef, useState } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"
import DynamicInput from "./DynamicInput"
import submitWPForm from "../../utils/submitWPForm"
import { useTranslation } from "react-i18next"

import useEditContext from "../../context/useEditContext"
import useResourceContext from "../../context/useResourceContext"
import { useResourceMediaForm } from "../../hooks/useResourceMediaForm"

export function BookForm() {
  const {
    featuredMediaId,
    featuredMediaUrl,
    setFeaturedMediaId,
    setFeaturedMediaUrl,
    setFiles,
    isMediaUploading,
    setIsMediaDeleting,
    isMediaDeleting,
  } = useResourceMediaForm()

  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const { restNonce, resources } = useResourceContext()
  const { restUrlEn, restUrlFa, en, fa, setEn, setFa } = resources.book
  const { resource: editingBook, setResource: setEditingBook } =
    useEditContext()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [availability, setAvailability] = useState("available")
  const [coAuthors, setCoAuthors] = useState([""])

  const formRef = useRef(null)

  const restUrl = lang === "fa" ? restUrlFa : restUrlEn

  let book = {}

  useEffect(() => {
    if (editingBook !== null) {
      setCoAuthors(editingBook.meta._thedah_book.coauthors)
      setAvailability(editingBook.meta._thedah_book.availability)
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [editingBook])

  const inputs = [
    { name: "title", placeholder: "Title", default: editingBook?.title ?? "" },
    {
      name: "author",
      placeholder: "Author",
      default: editingBook?.meta?._thedah_book?.author ?? "",
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: editingBook?.meta?._thedah_book?.publisher ?? "",
    },
    {
      name: "year",
      placeholder: "Year",
      default: editingBook?.meta?._thedah_book?.year ?? "",
    },
    {
      name: "edition",
      placeholder: "Edition",
      default: editingBook?.meta?._thedah_book?.edition ?? "",
    },
    {
      name: "numberOfPages",
      placeholder: "numberOfPages",
      default: editingBook?.meta?._thedah_book?.numberOfPages ?? "",
    },
    {
      name: "isbn",
      placeholder: "ISBN",
      default: editingBook?.meta?._thedah_book?.isbn ?? "",
    },
    {
      name: "price",
      placeholder: "Price",
      default: editingBook?.meta?._thedah_book?.price ?? "",
    },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const bookData = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      featured_media: featuredMediaId,
      meta: {
        _thedah_book: {
          publisher: formData.get("publisher"),
          year: formData.get("year"),
          author: formData.get("author"),
          edition: formData.get("edition"),
          isbn: formData.get("isbn"),
          price: formData.get("price"),
          // availability: formData.get("availability"),
          availability,
          coauthors: coAuthors,
          numberOfPages: formData.get("numberOfPages"),
        },
      },
    }

    const [responseData, error] = await submitWPForm(
      restUrl,
      restNonce,
      bookData,
      setIsSubmitting,
      editingBook?.id ?? 0
    )

    if (responseData) {
      if ("id" in responseData && responseData.id > 0) {
        book.id = responseData.id
        book.type = responseData.type
        book.title = responseData.title.raw
        book.content = responseData.content.raw
        book.featured_media_url = featuredMediaUrl
        book.featured_media = featuredMediaId
        book.meta = responseData.meta
        if (responseData.type === "thedah_book") {
          if (editingBook) {
            setEn(en.map((b) => (b.id === book.id ? book : b)))
          } else {
            setEn([book, ...en])
          }
        } else if (responseData.type === "thedah_bookfa") {
          if (editingBook) {
            setFa(fa.map((b) => (b.id === book.id ? book : b)))
          } else {
            setFa([book, ...fa])
          }
        } else {
          throw new Error("Error getting the submitted object back")
        }
      }
      setEditingBook(null)
    }
    if (error) console.error("Error submitting book", error)

    event.target.reset()
    setFeaturedMediaId(0)
    setFeaturedMediaUrl("")
    setCoAuthors([""])
    setFiles([])
  }

  return (
    <Card withBorder radius="md" p={15}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Flex wrap="wrap" gap={50} align="center">
          <Group noWrap align="center" spacing={40}>
            <Box w={200} pos="relative">
              <PictureDrop
                setFiles={setFiles}
                imageUrl={featuredMediaUrl}
                isUploading={isMediaUploading}
                alt="Book picture"
                setIsDeleting={setIsMediaDeleting}
                isDeleting={isMediaDeleting}
              />
            </Box>
            <Box pt={25}>
              {inputs.map((i) => (
                <TextInput
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
                // defaultValue={
                //   editingBook?.meta?._thedah_book?.availability ?? "available"
                // }
              />
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              // label="Autosize with 4 rows max"
              placeholder={t("Description")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="content"
              defaultValue={editingBook?.content ?? ""}
            />
            <Button type="submit" loading={isSubmitting}>
              {t("Submit")}
            </Button>
          </Stack>
        </Flex>
      </form>
    </Card>
  )
}
