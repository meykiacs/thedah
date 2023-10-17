import {
  ActionIcon,
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
// import { ImageList } from "./ImageList"
import useLanguageContext from "../../context/useLanguageContext"
import { MIME_TYPES } from "@mantine/dropzone"
import { IconTrash } from "@tabler/icons-react"

export function CourseForm({ maxImages }) {
  const [availability, setAvailability] = useState("available")
  const [coTeachers, setCoTeachers] = useState([""])

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
    removeImage,
  } = useCrudContext()

  const inputs = [
    {
      name: "title",
      placeholder: "Title",
      default: isEditing ? selectedPost?.title : "",
      required: true
    },
    {
      name: "teacher",
      placeholder: "Teacher",
      default: isEditing ? selectedPost?.meta?._thedah_course?.teacher : "",
      required: true
    },
    {
      name: "organizer",
      placeholder: "Organizer",
      default: isEditing ? selectedPost?.meta?._thedah_course?.organizer : "",
      required: false
    },
    {
      name: "duration",
      placeholder: "Duration",
      default: isEditing ? selectedPost?.meta?._thedah_course?.duration : "",
      required: false
    },
    {
      name: "courseType",
      placeholder: "courseType",
      default: isEditing ? selectedPost?.meta?._thedah_course?.courseType : "",
      required: true
    },
    {
      name: "price",
      placeholder: "Price",
      default: isEditing ? selectedPost?.meta?._thedah_course?.price : "",
      required: true
    },
    {
      name: "linkToCourse",
      placeholder: "LinkToCourse",
      default: isEditing ? selectedPost?.meta?._thedah_course?.linkToCourse : "",
      required: false
    },
  ]

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
      setCoTeachers(selectedPost?.meta?._thedah_course?.coTeachers ?? [""])
      setAvailability(
        selectedPost?.meta?._thedah_book?.availability ?? "available",
      )
      formRef.current.scrollIntoView({ behavior: "smooth" })
      formRef.current.focus()
    }
  }, [isEditing, selectedPost])

  
  const customHandleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const meta = {
      _thedah_course: {
        teacher: formData.get("teacher"),
        organizer: formData.get("organizer"),
        duration: formData.get("duration"),
        courseType: formData.get("courseType"),
        price: formData.get("price"),
        availability,
        coTeachers: coTeachers,
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
                {isEditing ? t("editCourse") : t("newCourse")}
              </Title>
              <ImageDropzone
                maxFiles={maxImages}
                mimeTypes={[MIME_TYPES.mp4]}
              />
            </Box>
            <Box pt={25}>
              {inputs.map((i) => (
                <TextInput
                  required={i.required}
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
                inputs={coTeachers}
                setInputs={setCoTeachers}
                label={t("CoTeacher")}
              />
              <SegmentedControl
                name="availability"
                value={availability}
                data={[
                  { label: t("Available"), value: "available" },
                  { label: t("Finished"), value: "finished" },
                  { label: t("Soon"), value: "soon" },
                ]}
                aria-label={t("Availability")}
                onChange={setAvailability}
                defaultValue={
                  selectedPost?.meta?._thedah_course?.availability ??
                  "available"
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
              {images[0] && (
                <>
                  <a href={images[0].source_url}>File</a>
                  <ActionIcon
                    onClick={() => {
                      removeImage(images[0].id)
                    }}
                  >
                    <IconTrash size="25px" />
                  </ActionIcon>
                </>
              )}
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
