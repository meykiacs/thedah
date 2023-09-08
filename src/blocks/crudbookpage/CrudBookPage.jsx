import BookForm from "../../components/crudbook/BookForm"
import ColorModeSwitch from "../../components/header/ColorModeSwitch"
import SuperBar from "../../components/header/SuperBar"
import { WPProvider } from "../../context/WPContext"
import { ChakraProvider } from "@chakra-ui/react"

export default function CrudBookPage({ providedValues }) {
  return (
    <ChakraProvider>
      <WPProvider providedValues={providedValues}>
        <SuperBar />
        <ColorModeSwitch />
        <BookForm />
      </WPProvider>
    </ChakraProvider>
  )
}
