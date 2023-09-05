import { __ } from "@wordpress/i18n"
import { TEXT_DOMAIN } from '../../constants'
import { Box, Button, Link } from "@chakra-ui/react"
import useWPContext from '../../context/useWPContext'

const NavLink = ({ url, children }) => (
  <Button
    as={Link}
    variant={Link}
    href={url}
    _hover={{ textDecoration: "none", color: "orange.100" }}
  >
    {children}
  </Button>
)

export default function NavLinks() {
  const { productsUrl, cartUrl } = useWPContext()
  const links = [
    { linkName: "Products", path: productsUrl },
    { linkName: "Shopping Cart", path: cartUrl },
  ]
  return (
    <Box as="nav" hideBelow="md">
      {links.map((link) => (
        <NavLink key={__(link.linkName, TEXT_DOMAIN)} url={link.path}>
          {link.linkName}
        </NavLink>
      ))}
    </Box>
  )
}
