import { useState, useEffect, useRef } from "@wordpress/element"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  CloseButton,
} from "@chakra-ui/react"
import useWPContext from "../../context/useWPContext"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [publisher, setPublisher] = useState("")
  const [year, setYear] = useState("")
  const [author, setAuthor] = useState("")
  const [pictureFile, setPictureFile] = useState(null)
  const [featuredMediaId, setFeaturedMediaId] = useState(0)
  const [featuredMediaUrl, setFeaturedMediaUrl] = useState('')
  const { restNonce, bookRestUrl, mediaRestUrl } = useWPContext()
  const fileInputRef = useRef()

  const handleFileChange = (event) => {
    setPictureFile(event.target.files[0])
  }

  const handleFileDrop = (event) => {
    event.preventDefault()
    setPictureFile(event.dataTransfer.files[0])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }

  useEffect(() => {
    if (pictureFile) {
      try {
        const reader = new FileReader()
        reader.onloadend = async () => {
          const response = await fetch(mediaRestUrl, {
            method: "POST",
            headers: {
              "Content-Type": pictureFile.type,
              "Content-Disposition": `attachment; filename="${pictureFile.name}"`,
              "X-WP-Nonce": restNonce,
            },
            body: reader.result,
          })
          const responseData = await response.json()
          console.log(responseData)
          setFeaturedMediaId(responseData.id)
          setFeaturedMediaUrl(responseData.source_url)
        }
        reader.readAsArrayBuffer(pictureFile)
      } catch (error) {
        console.error("Error uploading picture", error)
      }
    }
  }, [pictureFile, mediaRestUrl, restNonce])

  const handleDeletePicture = async () => {
    try {
      await fetch(`${mediaRestUrl}/${featuredMediaId}?force=1`, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": restNonce,
        },
      })
      setFeaturedMediaId(0)
      setFeaturedMediaUrl(null)
      fileInputRef.current.value = ""
      setPictureFile(null)
    } catch (error) {
      console.error("Error deleting picture", error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const bookData = {
      title,
      content: description,
      status: "publish",
      featured_media: featuredMediaId === 0 ? null : featuredMediaId,
      meta: {
        publisher,
        year,
      },
    }

    try {
      await fetch(bookRestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify(bookData),
      })
      setDescription('')
      setTitle('')
      setPublisher()
      setYear('')
      setPictureFile('')
      setFeaturedMediaId('')
      setFeaturedMediaUrl('')
      fileInputRef.current.value=""
      alert("Book submitted successfully")
    } catch (error) {
      console.error("Error submitting book", error)
    }
  }

  return (
    <Container>
      <Box
        as="form"
        onSubmit={handleSubmit}
        p={4}
        borderWidth={1}
        borderRadius="md"
      >
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id="description" mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="publisher" mt={4}>
          <FormLabel>Publisher</FormLabel>
          <Input
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </FormControl>

        <FormControl id="year" mt={4}>
          <FormLabel>Year</FormLabel>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </FormControl>

        <FormControl id="picture" mt={4}>
          <FormLabel>Picture</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <Box
            mt={2}
            w="200px"
            h="200px"
            borderWidth={1}
            borderRadius="md"
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
          >
            {featuredMediaUrl !== '' ? (
              <>
                <Image src={featuredMediaUrl} maxW="100%" maxH="100%" />
                <CloseButton onClick={handleDeletePicture} />
              </>
            ) : (
              "Drop image here"
            )}
          </Box>
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default BookForm
