import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Circle,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"

export default function ProductCard({ product }) {
  return (
    <Card maxW="md" variant="filled">
      <CardBody>
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            insetEnd={2}
            bg="green.300"
          />
        )}
        {!product.isInStock && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            insetEnd={2}
            bg="red.300"
          />
        )}
        <Image
          src={product.imageThumbnail}
          alt={product.name}
          roundedTop="lg"
        />
        {!product.isInStock && (
          <Badge rounded="full" px="2" fontSize="sm" colorScheme="red">
            Sold out
          </Badge>
        )}
        {product.isNew && (
          <Badge rounded="full" px="2" fontSize="sm" colorScheme="green">
            New
          </Badge>
        )}

        <Stack mt="6" spacing="3">
          <Link href={product.url}><Heading size="md" as='h3'>{product.name}</Heading></Link>
          <Text>{product.description}</Text>
          <Text>{product.salePrice}</Text>
          <Text>{`${product.regularPrice} ${product.currency}`}</Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="orange">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="orange">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
