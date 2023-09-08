import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react"

export default function SuperBar() {
  return <Box bgColor={useColorModeValue("gray.100", "gray.900")}>
    <HStack>
      <Button>En</Button>
      <Button>فا</Button>
    </HStack>
  </Box>
}
