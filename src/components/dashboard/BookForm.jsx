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
import { useEffect, useState } from "@wordpress/element"
import useWPContext from "../../context/useWPContext"
import useLanguageContext from "../../context/useLanguageContext"
import useFetchPicture from "../../hooks/useFetchPicture"
import DynamicInput from "./DynamicInput"
import useDeleteMedia from "../../hooks/useDeleteMedia"
import submitWPForm from "../../utils/submitWPForm"
import { useTranslation } from "react-i18next"

import useBooksContext from "../../context/useBooksContext"
let book = {}
const inputs = [
  "Title",
  "Author",
  "Publisher",
  "Year",
  "Edition",
  "numberOfPages",
  "ISBN",
  "Price",
]
export default function BookForm() {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  const [featuredMediaId, setFeaturedMediaId] = useState(0)
  const [featuredMediaUrl, setFeaturedMediaUrl] = useState("")
  const [coAuthors, setCoAuthors] = useState([""])
  const [isMediaDeleting, setIsMediaDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { restNonce, bookRestUrlEn, bookRestUrlFa, mediaRestUrl } =
    useWPContext()
  const { lang } = useLanguageContext()
  const bookRestUrl = lang === "fa" ? bookRestUrlFa : bookRestUrlEn
  const { booksFa, booksEn, setBooksFa, setBooksEn } = useBooksContext()

  const file = files[0] ?? null
  const [isMediaUploading, mediaUploadResponseData, mediaUploadError] =
    useFetchPicture({ pictureFile: file, mediaRestUrl, restNonce })

  const [mediaDeleteResponseData, mediaDeleteError] = useDeleteMedia({
    featuredMediaId,
    isDeleting: isMediaDeleting,
    setIsDeleting: setIsMediaDeleting,
  })

  useEffect(() => {
    if (mediaDeleteResponseData) {
      // console.log(`Picture Delete Response: ${mediaDeleteError}`)
      setFeaturedMediaId(0)
      setFeaturedMediaUrl("")
    }
  }, [mediaDeleteResponseData, mediaDeleteError])

  useEffect(() => {
    if (mediaUploadResponseData) {
      setFeaturedMediaId(mediaUploadResponseData.id)
      setFeaturedMediaUrl(mediaUploadResponseData.source_url)
    }
  }, [mediaUploadResponseData])

  if (mediaUploadError) {
    console.log(`Picture Post Error: ${mediaUploadError}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    // coAuthors.forEach((c) => formData.append("ca[]", c))
    const bookData = {
      title: formData.get("Title"),
      content: formData.get("content"),
      status: "publish",
      featured_media: featuredMediaId,
      meta: {
        _thedah_book: {
          publisher: formData.get("Publisher"),
          year: formData.get("Year"),
          author: formData.get("Author"),
          edition: formData.get("Edition"),
          isbn: formData.get("ISBN"),
          price: formData.get("Price"),
          availability: formData.get("Availability"),
          coauthors: coAuthors,
          numberOfPages: formData.get("numberOfPages"),
        },
      },
    }

    const [responseData, error] = await submitWPForm(
      bookRestUrl,
      restNonce,
      bookData,
      setIsSubmitting
    )

    if (responseData) {
      if ("id" in responseData && responseData.id > 0) {
        book.id = responseData.id
        book.picture = responseData.featuredMediaId
        book.title = responseData.title.raw
        book.description = responseData.content.raw
        book.picture = featuredMediaUrl
        book.meta = responseData.meta._thedah_book
        if (responseData.type === "thedah_book") {
          setBooksEn([book, ...booksEn])
        } else if (responseData.type === "thedah_bookfa") {
          console.log(responseData)

          setBooksFa([book, ...booksFa])
        } else {
          throw new Error('Error getting the submitted object back')
        }
      }
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
      <form onSubmit={handleSubmit}>
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
                  placeholder={t(i)}
                  aria-label={t(i)}
                  mb={15}
                  name={i}
                />
              ))}
              <DynamicInput
                inputs={coAuthors}
                setInputs={setCoAuthors}
                label={t("CoAuthor")}
              />
              <SegmentedControl
                name="Availability"
                data={[
                  { label: t("Available"), value: "available" },
                  { label: t("Unavailable"), value: "unavailable" },
                  { label: t("Soon"), value: "soon" },
                ]}
                aria-label={t("Availability")}
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
