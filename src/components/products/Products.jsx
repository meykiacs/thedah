import { Center, Wrap, WrapItem } from "@chakra-ui/react"
import useWPContext from "../../context/useWPContext"
import ProductCard from "./ProductCard"

export default function Products() {
  const { products } = useWPContext()
  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {products.map((p) => (
        <WrapItem key={p.id}>
          <Center w="250px">
            <ProductCard product={p} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  )
}
