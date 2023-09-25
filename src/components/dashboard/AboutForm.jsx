import { useEffect, useRef, useState } from "@wordpress/element"
import submitWPForm from "../../utils/submitWPForm"
import useLanguageContext from "../../context/useLanguageContext"
import useResourceContext from "../../context/useResourceContext"
import { Box, Button, Card, Flex, Group, Stack, TextInput } from "@mantine/core"
import PictureDrop from "./PictureDrop"
import DynamicInput from "./DynamicInput"
import { useTranslation } from "react-i18next"

export default function AboutForm({
  featuredMediaId,
  featuredMediaUrl,
  setFiles,
  isMediaUploading,
  setIsMediaDeleting,
  isMediaDeleting,
}) {
  const { t } = useTranslation()
  const { lang } = useLanguageContext()
  const { resources, restNonce, resourceName } = useResourceContext()
  const { restUrlEn, restUrlFa, en, fa, setEn, setFa } = resources[resourceName]
  const aboutFromContext = lang === "fa" ? fa : en
  const [about, setAbout] = useState(aboutFromContext)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [education, setEducation] = useState([""])
  const [activities, setActivities] = useState([""])
  const [executiveRecords, setExecutiveRecords] = useState([""])
  const [awardsAndHonors, setAwardsAndHonors] = useState([""])

  const formRef = useRef(null)

  const restUrl = lang === "fa" ? restUrlFa : restUrlEn

  useEffect(() => {
    setAbout(lang === 'fa' ? fa : en)
    formRef.current.reset()
  }, [lang, en, fa])

  useEffect(() => {
    setEducation(about?.meta?._thedah_about?.education ?? [""])
    setActivities(about?.meta?._thedah_about?.activities ?? [""])
    setExecutiveRecords(about?.meta?._thedah_about?.executiveRecords ?? [""])
    setAwardsAndHonors(about?.meta?._thedah_about?.awardsAndHonors ?? [""])

    formRef.current.scrollIntoView({ behavior: "smooth" })
    formRef.current.focus()
  }, [setEducation, about])

  const inputs = [
    {
      name: "academicRank",
      placeholder: "Academic Rank",
      default: about?.meta._thedah_about?.academicRank ?? "",
    },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    formData.append("status", "publish")
    const aboutData = {
      title: "",
      content: "",
      status: "publish",
      featured_media: featuredMediaId,
      meta: {
        _thedah_about: {
          education,
          activities,
          executiveRecords,
          awardsAndHonors,
          academicRank: formData.get("academicRank"),
        },
      },
    }
    const [responseData, error] = await submitWPForm(
      restUrl,
      restNonce,
      aboutData,
      setIsSubmitting,
      about?.id ?? 0
    )
    const newAbout = {}
    if (responseData) {
      if ("id" in responseData && responseData.id > 0) {
        newAbout.id = responseData.id
        newAbout.type = responseData.type
        newAbout.title = responseData.title.raw
        newAbout.content = responseData.content.raw
        newAbout.featured_media_url = featuredMediaUrl
        newAbout.featured_media = featuredMediaId
        newAbout.meta = responseData.meta
        if (responseData.type === "thedah_about") {
          setEn(newAbout)
          // if (editingResource) {
          //   setEn(en.map((b) => (b.id === paper.id ? paper : b)))
          // } else {
          //   setEn([paper, ...en])
          // }
        } else if (responseData.type === "thedah_aboutfa") {
          // if (editingPaper) {
          //   setFa(fa.map((b) => (b.id === paper.id ? paper : b)))
          // } else {
          //   setFa([paper, ...fa])
          // }
          setFa(newAbout)
        } else {
          throw new Error("Error getting the submitted object back")
        }
      }
      setAbout(newAbout)
    }
    if (error) console.error("Error submitting About", error)

    // event.target.reset()
    // setFeaturedMediaId(0)
    // setFeaturedMediaUrl("")
    // setCoAuthors([""])
    // setFiles([])
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
                inputs={education}
                setInputs={setEducation}
                label={t("Education")}
              />
              <DynamicInput
                inputs={activities}
                setInputs={setActivities}
                label={t("Activities")}
              />
              <DynamicInput
                inputs={executiveRecords}
                setInputs={setExecutiveRecords}
                label={t("Executive Records")}
              />
              <DynamicInput
                inputs={awardsAndHonors}
                setInputs={setAwardsAndHonors}
                label={t("Awards and Honors")}
              />
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Button type="submit" loading={isSubmitting}>
              {t("Submit")}
            </Button>
          </Stack>
        </Flex>
      </form>
    </Card>
  )
}
