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
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
import useResourceList from "../../hooks/useResourceList"

export function SocialForm() {
  const { t } = useTranslation()
  const formRef = useRef(null)
  const socialList = useResourceList("social")
  const {
    handleSubmit,
    setSelectedPostId,
    isCreatingOrUpdatingPost,
    setIsEditing,
  } = useCrudContext()

  const [isFormLocked, setIsFormLocked] = useState(true)
  const social = socialList[0]

  useEffect(() => {
    formRef.current.focus()
    setSelectedPostId(social?.id ?? 0)
  }, [social, setSelectedPostId])

  useEffect(() => {
    if (social) {
      setIsEditing(true)
    }
    else {
      setIsEditing(false)
    }
    setIsFormLocked(true)
    // eslint-disable-next-line
  }, []) 

  const inputs = [
    {
      name: "instagram",
      placeholder: "Instagram Id",
      default: social?.meta?._tds_social?.instagram ?? "",
    },
    {
      name: "linkedin",
      placeholder: "Linkedin Id",
      default: social?.meta?._tds_social?.linkedin ?? "",
    },
    {
      name: "telegram",
      placeholder: "Telegram Id",
      default: social?.meta?._tds_social?.telegram ?? "",
    },
    {
      name: "whatsapp",
      placeholder: "Whatsapp Id",
      default: social?.meta?._tds_social?.whatsapp ?? "",
    },
    {
      name: "phone",
      placeholder: "Phone Number",
      default: social?.meta?._tds_social?.phone ?? "",
    },
    {
      name: "email",
      placeholder: "Email Address",
      default: social?.meta?._tds_social?.email ?? "",
    },
    {
      name: "twitter",
      placeholder: "Twitter Id",
      default: social?.meta?._tds_social?.twitter ?? "",
    },
    {
      name: "eeta",
      placeholder: "Eeta Id",
      default: social?.meta?._tds_social?.eeta ?? "",
    },
    {
      name: "youtube",
      placeholder: "Youtube Id",
      default: social?.meta?._tds_social?.youtube ?? "",
    },
  ]

  const customHandleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const meta = {
      _tds_social: {
        twitter: formData.get("twitter"),
        telegram: formData.get("telegram"),
        instagram: formData.get("instagram"),
        linkedin: formData.get("linkedin"),
        whatsapp: formData.get("whatsapp"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        eeta: formData.get("eeta"),
        youtube: formData.get("youtube"),
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
                {t("editSocial")}
              </Title>
            </Box>
            <Box pt={25}>
              {inputs.map((i) => (
                <TextInput
                  disabled={isFormLocked}
                  label={t(i.placeholder)}
                  key={i}
                  // placeholder={t(i.placeholder)}
                  aria-label={t(i.placeholder)}
                  mb={15}
                  name={i.name}
                  defaultValue={i.default}
                />
              ))}
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
