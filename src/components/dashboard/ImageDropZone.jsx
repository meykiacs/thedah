import { Text, Center } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"

export function ImageDropzone({ maxFiles }) {
  const { uploadImage, isImageUploading } = useCrudContext()
  const { t } = useTranslation()
  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      maxFiles={maxFiles}
      onDrop={(files) => files.forEach((f) => uploadImage(f, maxFiles))}
      loading={isImageUploading}
      mih={200}
    >
      <Center h={100}>
        <Text c="dimmed" align="center" fz="sm">
          {t("imageDrop")}
        </Text>
      </Center>
    </Dropzone>
  )
}
