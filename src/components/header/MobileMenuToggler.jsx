import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export default function MobileMenuToggler({isOpen, onClose, onOpen}) {
  return (
    <IconButton
    size="md"
    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
    hideFrom="md"
    onClick={isOpen ? onClose : onOpen}
  />
  )
}
