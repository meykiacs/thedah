import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

export const ImageDropzone = ({ onDrop }) => (
  <Dropzone onDrop={onDrop} accept={IMAGE_MIME_TYPE} />
)
