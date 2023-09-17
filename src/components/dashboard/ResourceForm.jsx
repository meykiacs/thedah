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
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"
import useFetchPicture from "../../hooks/useFetchPicture"
import DynamicInput from "./DynamicInput"
import useDelete from "../../hooks/useDelete"
import submitWPForm from "../../utils/submitWPForm"
import { useTranslation } from "react-i18next"

import useBooksContext from "../../context/useBooksContext"
import useEditContext from "../../context/useEditContext"

export default function ResourceForm({ resource, inputs }) {
  const {resource: editingResource, setResource: setEditingResource} = useEditContext()
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const { restNonce, mediaRestUrl } =
    useWPContext()


  const [files, setFiles] = useState([])
  const [featuredMediaId, setFeaturedMediaId] = useState(0)
  const [featuredMediaUrl, setFeaturedMediaUrl] = useState("")
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [coAuthors, setCoAuthors] = useState([""])
  const [availability, setAvailability] = useState("available")

  const formRef = useRef(null)

  const restUrl = lang === "fa" ? resource.restUrlFa : resource.restUrlEn
  const file = files[0] ?? null

  useEffect(() => {
    if (editingResource !== null) {
      setFeaturedMediaId(editingResource.featured_media)
      setFeaturedMediaUrl(editingResource.featured_media_url)
      setCoAuthors(editingResource.meta._thedah_book.coauthors)
      setAvailability(editingResource.meta._thedah_book.availability)
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()

      // console.log(editingBook)
    }
  }, [editingResource])

  const [isMediaUploading, mediaUploadResponseData, mediaUploadError] =
    useFetchPicture({ pictureFile: file, mediaRestUrl, restNonce })

  useEffect(() => {
    if (mediaUploadResponseData) {
      setFeaturedMediaId(mediaUploadResponseData.id)
      setFeaturedMediaUrl(mediaUploadResponseData.source_url)
    }
  }, [mediaUploadResponseData])

  if (mediaUploadError) {
    console.log(`Picture Post Error: ${mediaUploadError}`)
  }

  const [mediaDeleteResponseData, mediaDeleteError] = useDelete({
    id: featuredMediaId,
    isDeleting: isMediaDeleting,
    setIsDeleting: setIsMediaDeleting,
    restUrl: mediaRestUrl,
  })

  useEffect(() => {
    if (mediaDeleteResponseData) {
      // console.log(`Picture Delete Response: ${mediaDeleteError}`)
      setFeaturedMediaId(0)
      setFeaturedMediaUrl("")
    }
  }, [mediaDeleteResponseData, mediaDeleteError])

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
      bookRestUrl,
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
            setBooksEn(booksEn.map((b) => (b.id === book.id ? book : b)))
          } else {
            setBooksEn([book, ...booksEn])
          }
        } else if (responseData.type === "thedah_bookfa") {
          if (editingBook) {
            setBooksFa(booksFa.map((b) => (b.id === book.id ? book : b)))
          } else {
            setBooksFa([book, ...booksFa])
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
