import { Flex, Icon, Link, Text } from "@chakra-ui/react"
import { GiTechnoHeart } from "react-icons/gi"
import useWPContext from '../../context/useWPContext'

export default function SiteBranding() {
  const { homeUrl, siteTitle } = useWPContext()
  return (
    <Link href={homeUrl} _hover={{ decoration: "none" }}>
      <Flex alignItems="center" gap={2}>
        <Icon as={GiTechnoHeart} h={6} w={6} mt="-2.5px" color="orange.400" />
        <Text fontWeight="extrabold">{siteTitle}</Text>
      </Flex>
    </Link>
  )
}
