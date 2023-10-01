import { ActionIcon, Box, Image, LoadingOverlay } from "@mantine/core"
import { useCrudContext } from "../../context/CrudContext"
import { IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "@wordpress/element"

export const ImageList = ({ images }) => {
  const { removeImage, isImageDeleting } = useCrudContext()
  const [deletingImageId, setDeletingImageId] = useState(0)
  useEffect(() => {
    if (!isImageDeleting) {
      setDeletingImageId(0)
    }
  }, [isImageDeleting])
  return (
    <>
      {images.map((image) => (
        <Box pos="relative" key={image.id} w="150px" mt={20}>
          <LoadingOverlay
            visible={isImageDeleting && image.id === deletingImageId}
            overlayBlur={2}
          />

          <Image src={image.mediumUrl} alt="alt" />
          <ActionIcon
            onClick={() => {
              setDeletingImageId(image.id)
              removeImage(image.id)
            }}
            pos="absolute"
            top={5}
            left={5}
            variant="filled"
          >
            <IconTrash size="25px" />
          </ActionIcon>
        </Box>
      ))}
    </>
  )
}
