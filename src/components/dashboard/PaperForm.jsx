import { useEffect, useRef, useState } from "@wordpress/element"
import useEditContext from "../../context/useEditContext"
import submitWPForm from "../../utils/submitWPForm"
import useLanguageContext from "../../context/useLanguageContext"
import useResourceContext from "../../context/useResourceContext"
import { Box, Button, Card, Flex, Group, Stack, TextInput, Textarea } from "@mantine/core"
import PictureDrop from "./PictureDrop"
import DynamicInput from "./DynamicInput"
import { useTranslation } from "react-i18next"

export default function PaperForm({ featuredMediaId, featuredMediaUrl, setFeaturedMediaId, setFeaturedMediaUrl, setFiles, isMediaUploading, setIsMediaDeleting, isMediaDeleting, }) {
  const {t} = useTranslation()
  const { lang } = useLanguageContext()
  const { resource, restNonce } = useResourceContext()
  const { restUrlEn, restUrlFa, en, fa, setEn, setFa } = resource
  const { resource: editingPaper, setResource: setEditingPaper } = useEditContext()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [coAuthors, setCoAuthors] = useState([""])

  const formRef = useRef(null)
  
  const restUrl = lang === "fa" ? restUrlFa : restUrlEn

  const paper = {}

  useEffect(() => {
    if (editingPaper !== null) {
      setCoAuthors(editingPaper?.meta?._thedah_paper?.coauthors ?? [''])

      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [editingPaper])

  const inputs = [
    { name: "title", placeholder: "Title", default: editingPaper?.title ?? "" },
    {
      name: "author",
      placeholder: "Author",
      default: editingPaper?.meta?._thedah_paper?.author ?? "",
    },
    {
      name: "publisher",
      placeholder: "Publisher",
      default: editingPaper?.meta?._thedah_paper?.publisher ?? "",
    },
    {
      name: "year",
      placeholder: "Year",
      default: editingPaper?.meta?._thedah_paper?.year ?? "",
    },
    {
      name: "summary",
      placeholder: "Summary",
      default: editingPaper?.meta?._thedah_paper?.summary ?? "",
    },
    {
      name: "link",
      placeholder: "Link",
      default: editingPaper?.meta?._thedah_paper?.link ?? "",
    },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const paperData = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: "publish",
      featured_media: featuredMediaId,
      meta: {
        _thedah_paper: {
          publisher: formData.get("publisher"),
          year: formData.get("year"),
          author: formData.get("author"),
          coauthors: coAuthors,
          summary: formData.get("summary"),
          link: formData.get("link"),
        },
      },
    }

    const [responseData, error] = await submitWPForm(
      restUrl,
      restNonce,
      paperData,
      setIsSubmitting,
      editingPaper?.id ?? 0
    )

    if (responseData) {
      if ("id" in responseData && responseData.id > 0) {
        paper.id = responseData.id
        paper.type = responseData.type
        paper.title = responseData.title.raw
        paper.content = responseData.content.raw
        paper.featured_media_url = featuredMediaUrl
        paper.featured_media = featuredMediaId
        paper.meta = responseData.meta
        if (responseData.type === "thedah_paper") {
          if (editingPaper) {
            setEn(en.map((b) => (b.id === paper.id ? paper : b)))
          } else {
            setEn([paper, ...en])
          }
        } else if (responseData.type === "thedah_paperfa") {
          if (editingPaper) {
            setFa(fa.map((b) => (b.id === paper.id ? paper : b)))
          } else {
            setFa([paper, ...fa])
          }
        } else {
          throw new Error("Error getting the submitted object back")
        }
      }
      setEditingPaper(null)
    }
    if (error) console.error("Error submitting paper", error)

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
                alt="Paper picture"
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
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Textarea
              // label="Autosize with 4 rows max"
              placeholder={t("Summary")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="summary"
              defaultValue={editingPaper?.meta?._thedah_paper?.summary ?? ""}
            />
            <Textarea
              // label="Autosize with 4 rows max"
              placeholder={t("Content")}
              autosize
              minRows={5}
              maxRows={10}
              miw="350px"
              name="content"
              defaultValue={editingPaper?.content ?? ""}
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
