import { useEffect, useRef, useState } from "@wordpress/element"
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import DynamicInput from "./DynamicInput"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import useLanguageContext from "../../context/useLanguageContext"
import useResourceList from "../../hooks/useResourceList"

export function AboutForm() {
  const { t } = useTranslation()
  const formRef = useRef(null)
  const { lang } = useLanguageContext()
  const aboutList = useResourceList("about")
  const {
    handleSubmit,
    setSelectedPostId,
    isCreatingOrUpdatingPost,
    setIsEditing,
  } = useCrudContext()

  const [education, setEducation] = useState([""])
  const [activities, setActivities] = useState([""])
  const [executiveRecords, setExecutiveRecords] = useState([""])
  const [awardsAndHonors, setAwardsAndHonors] = useState([""])
  const [isFormLocked, setIsFormLocked] = useState(true)
  const about = aboutList[0]
  useEffect(() => {
    formRef.current.reset()
  }, [lang])

  useEffect(() => {
    formRef.current.focus()
    setSelectedPostId(about?.id ?? 0)
    setEducation(about?.meta?._thedah_about?.education ?? [""])
    setActivities(about?.meta?._thedah_about?.activities ?? [""])
    setExecutiveRecords(about?.meta?._thedah_about?.executiveRecords ?? [""])
    setAwardsAndHonors(about?.meta?._thedah_about?.awardsAndHonors ?? [""])
  }, [about, setIsEditing, setSelectedPostId])

  useEffect(() => {
    if (about) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
    setIsFormLocked(true)
    // eslint-disable-next-line
  }, [])

  const inputs = [
    {
      name: "academicRank",
      placeholder: "academicRank",
      default: about?.meta?._thedah_about?.academicRank ?? "",
    },
  ]

  const customHandleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const meta = {
      _thedah_about: {
        education,
        activities,
        executiveRecords,
        awardsAndHonors,
        academicRank: formData.get("academicRank"),
      },
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
                {t("editAboutPage")}
              </Title>
            </Box>
            <Box pt={25}>
              {inputs.map((i) => (
                <TextInput
                  disabled={isFormLocked}
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
                disabled={isFormLocked}
                inputs={education}
                setInputs={setEducation}
                label={t("Education")}
              />
              <DynamicInput
                disabled={isFormLocked}
                inputs={activities}
                setInputs={setActivities}
                label={t("activities")}
              />
              <DynamicInput
                disabled={isFormLocked}
                inputs={executiveRecords}
                setInputs={setExecutiveRecords}
                label={t("executiveRecords")}
              />
              <DynamicInput
                disabled={isFormLocked}
                inputs={awardsAndHonors}
                setInputs={setAwardsAndHonors}
                label={t("awardsAndHonors")}
              />
            </Box>
          </Group>
          <Stack pt={25} spacing={50} align="center">
            <Group mt="24px" justify="center">
              {!isFormLocked ? (
                <Button
                  type="submit"
                  loading={isCreatingOrUpdatingPost}
                  color="green"
                >
                  {t("Submit")}
                </Button>
              ) : (
                <Button
                  loading={isCreatingOrUpdatingPost}
                  color="green"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFormLocked(false)
                  }}
                >
                  {t("Edit")}
                </Button>
              )}
              {!isFormLocked && (
                <Button
                  loading={isCreatingOrUpdatingPost}
                  color="red"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsFormLocked(true)
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
