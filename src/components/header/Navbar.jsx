import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import ColorModeSwitch from "./ColorModeSwitch"
import NavLinks from "./NavLinks"
import AuthLinks from "./AuthLinks"
import MobileMenuToggler from "./MobileMenuToggler"
import SiteBranding from "./SiteBranding"
import MobileMenu from "./MobileMenu"

export default function Navbar() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Box bgColor={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16} px={4} alignItems="center" justifyContent="space-between">
        <MobileMenuToggler isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        <HStack>
          <SiteBranding />
          <NavLinks />
        </HStack>
        <HStack>
          <ColorModeSwitch />
          <AuthLinks />
        </HStack>
      </Flex>
      <MobileMenu isOpen={isOpen} />
    </Box>
  )
}
