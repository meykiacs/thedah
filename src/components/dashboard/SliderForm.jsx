import { Box, Card, Center, Text, Title } from "@mantine/core"
import { useTranslation } from "react-i18next"
import useResourceList from "../../hooks/useResourceList"
import useResourceContext from "../../context/useResourceContext"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { createPostObjectFromData } from "../../utils/wp"
import { useEffect, useState } from "@wordpress/element"
import useLanguageContext from "../../context/useLanguageContext"

export function SliderForm() {
  const { t } = useTranslation()
  const { restNonce, mediaRestUrl, resources } = useResourceContext()
  const { restUrl, setR } = resources.slider
  const [isLoading, setIsLoading] = useState(false)

  let sliderList = useResourceList("slider") // this could be an empty array if no post of type slider exists
  let pslider = sliderList[0] // the first post of an array of slider posts objects
  // Set the maximum number of images to 3
  const [slider, setSlider] = useState(pslider)
  const maxImages = 3
  const images = slider?.meta?._thedah_images ?? []
  // const { lang } = useLanguageContext()

  useEffect(() => {
    setSlider(pslider)
  }, [pslider])

  // Function to handle file upload
  const handleUpload = async (files) => {
    try {
      setIsLoading(true)
      let newSlider = slider
      // Check if a slider post exists
      if (!slider) {
        // Create a new slider post
        const createResponse = await fetch(restUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": restNonce,
          },
          body: JSON.stringify({
            title: "New Slider Post",
            status: "publish",
            type: "slider",
          }),
        })

        if (!createResponse.ok) {
          setIsLoading(false)
          throw new Error("Creation of new slider post failed")
        }

        const createData = await createResponse.json()
        newSlider = createPostObjectFromData(createData)

        setSlider(newSlider)

        setR((prev) => [slider, ...prev])
      }

      // Upload each image to the WordPress media library
      const imageResponses = await Promise.all(
        files.map((file) => {
          const imageData = new FormData()
          imageData.append("file", file)
          return fetch(mediaRestUrl, {
            method: "POST",
            headers: {
              "X-WP-Nonce": restNonce,
            },
            body: imageData,
          })
        }),
      )

      // Get the image data from the responses
      const imagesData = await Promise.all(
        imageResponses.map((response) => response.json()),
      )

      // Format the images data for the _thedah_images field
      const thedahImages = imagesData.map((data) => ({
        id: data.id,
        mediumUrl: data.media_details.sizes.medium?.source_url ?? "",
        thumbnailUrl: data.media_details.sizes.thumbnail?.source_url ?? "",
        mediumLargeUrl: data.media_details.sizes.medium_large?.source_url ?? "",
        largeUrl: data.media_details.sizes.large?.source_url ?? "",
        paperLandscapeUrl:
          data.media_details.sizes.paperLandscape?.source_url ?? "",
        bannerSliderUrl:
          data.media_details.sizes.bannerSlider?.source_url ?? "",
        gallerySquareUrl:
          data.media_details.sizes.gallerySquare?.source_url ?? "",
        fullUrl: data.media_details.sizes.full?.source_url ?? "",
        source_url: data.source_url ?? "",
      }))

      // Update the slider post with the new images
      const updateResponse = await fetch(`${restUrl}/${newSlider.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify({
          meta: {
            _thedah_images: [...thedahImages, ...images],
          },
        }),
      })

      if (!updateResponse.ok) {
        setIsLoading(false)
        throw new Error("Update failed")
      }

      const updateData = await updateResponse.json()

      setSlider(createPostObjectFromData(updateData))
      console.log("Update successful")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleDelete = async (imageId) => {
    try {
      // Remove the image from the WordPress media library
      const deleteResponse = await fetch(`${mediaRestUrl}/${imageId}?force=1`, {
        method: "DELETE",
        headers: {
          "X-WP-Nonce": restNonce,
        },
      })

      if (!deleteResponse.ok) {
        throw new Error("Deletion failed")
      }

      // Remove the image from the _thedah_images field
      const newImages = images.filter((image) => image.id !== imageId)

      // Update the slider post without the deleted image
      const updateResponse = await fetch(`${restUrl}/${slider.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": restNonce,
        },
        body: JSON.stringify({
          meta: {
            _thedah_images: newImages,
          },
        }),
      })

      if (!updateResponse.ok) {
        throw new Error("Update failed")
      }

      const updateData = await updateResponse.json()

      setSlider(createPostObjectFromData(updateData))
      console.log("Update successful")
    } catch (error) {
      console.error(error)
    }
  }

  console.log(slider)

  return (
    <Card withBorder radius="md" p={15}>
      <Title order={1} size="h2" mb="32px">
        {t("chooseSliderImages")}
      </Title>
      <Box w={200} pos="relative">
        <Dropzone
          maxFiles={maxImages}
          onDrop={handleUpload}
          accept={IMAGE_MIME_TYPE}
          mih={200}
          loading={isLoading}
        >
          <Center h={100}>
            <Text c="dimmed" align="center" fz="sm">
              {t("imageDrop")}
            </Text>
          </Center>
        </Dropzone>
        {images &&
          images.map((image) => (
            <div key={image.id}>
              <img src={image.source_url} alt="" />
              <button onClick={() => handleDelete(image.id)}>Delete</button>
            </div>
          ))}
      </Box>
    </Card>
  )
}
