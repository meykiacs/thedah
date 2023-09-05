import { Button, HStack } from "@chakra-ui/react"
import { __ } from "@wordpress/i18n"

export default function AuthLinks() {
  return (
    <HStack spacing="4">
      <Button size="sm" variant="link">
        {__('Sign In')}
      </Button>
      <Button size="sm" variant="solid" colorScheme="orange">
        {__('Sign Up')}
      </Button>
    </HStack>
  )
}
