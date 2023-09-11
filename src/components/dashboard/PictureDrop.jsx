import {
  Text,
  Image,
  Center,
  Box,
  ActionIcon,
  LoadingOverlay,
} from "@mantine/core"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { IconTrash } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

export default function PictureDrop({
  setFiles,
  imageUrl,
  isUploading,
  alt,
  setIsDeleting,
  isDeleting,
}) {
  const { t } = useTranslation()
  return (
    <>
      {imageUrl ? (
        <Box pos="relative">
          <LoadingOverlay visible={isDeleting} overlayBlur={2} />

          <Image src={imageUrl} alt={alt} />
          <ActionIcon
            onClick={() => setIsDeleting(true)}
            pos="absolute"
            top={5}
            left={5}
            variant="filled"
          >
            <IconTrash size="25px" />
          </ActionIcon>
        </Box>
      ) : (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={setFiles}
          loading={isUploading}
          mih={200}
          maxFiles={1}
        >
          <Center h={100}>
            <Text c="dimmed" align="center" fz="sm">
              {t("imageDrop")}
            </Text>
          </Center>
        </Dropzone>
      )}
    </>
  )
}
