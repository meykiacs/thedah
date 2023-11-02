import { SimpleGrid, Card, Image, Text, Modal } from "@mantine/core"
import classes from "./GalleryGrid.module.css"
import useResourceList from "../../hooks/useResourceList"
import { useState } from "@wordpress/element"

export const GalleryGrid = () => {
  const data = useResourceList("gallery")
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const cards = data.map((article) => (
    <Card
      key={article.id}
      p="md"
      radius="md"
      className={classes.card}
      onClick={(e) => {
        e.preventDefault()
        setSelectedImage(article.meta._thedah_images[0].source_url)
        setModalOpened(true)
      }}
      component="a"
      href="#"
      bg='white'
      c='gray'
    >
      <Image src={article.meta._thedah_images[0].paperLandscapeUrl} />
      <Text className={classes.title} mt={5} fz="xl">
        {article.title}
      </Text>
    </Card>
  ))

  return (
    <>
      <SimpleGrid py="xl" cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
        {cards}
      </SimpleGrid>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        hideCloseButton
        size='auto'        
      >
        <Image src={selectedImage} />
      </Modal>
    </>
  )
}
