import { Link, Stack } from "@chakra-ui/react"

const links = [
  { linkName: "Products", path: "/products" },
  { linkName: "Shopping Cart", path: "/cart" },
]

export default function MobileMenu({ isOpen }) {
  return isOpen ? (
    <>
      <Stack borderTop="1px">
        {links.map((link) => (
          <Link
            key={link.linkName}
            href={link.path}
            display="block"
            textAlign="center"
            pt={3}
            _last={{ pb: 3 }}
          >
            {link.linkName}
          </Link>
        ))}
      </Stack>
    </>
  ) : null
}
