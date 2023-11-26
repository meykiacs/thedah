import { Text, Center } from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { useTranslation } from "react-i18next"
import { useCrudContext } from "../../context/CrudContext"
const maxFileSize = 50*1024**2

export function ImageDropzone({ maxFiles, mimeTypes = IMAGE_MIME_TYPE, maxSize={maxFileSize}, text="imageDrop" }) {
  const { uploadImage, isImageUploading } = useCrudContext()
  const { t } = useTranslation()
  return (
    <Dropzone
      accept={mimeTypes}
      maxFiles={maxFiles}
      maxSize={maxSize}
      onDrop={(files) => files.forEach((f) => uploadImage(f, maxFiles))}
      loading={isImageUploading}
      mih={200}
    >
      <Center h={100}>
        <Text c="dimmed" align="center" fz="sm">
          {t(text)}
        </Text>
      </Center>
    </Dropzone>
  )
}
