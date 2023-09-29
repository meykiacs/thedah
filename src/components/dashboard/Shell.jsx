// import { AppShell, useMantineTheme } from "@mantine/core"
// import { NavbarSimple } from "./NavbarSimple"
// import { HeaderResponsive } from "./HeaderResponsive"
// import App from "./App"
// import { EditContextProvider } from "../../context/EditContext"

// export default function Shell() {
//   const theme = useMantineTheme()
//   return (
//     <EditContextProvider>
//     <AppShell
//       fixed={false}
//       styles={{
//         main: {
//           background:
//             theme.colorScheme === "dark"
//               ? theme.colors.dark[8]
//               : theme.colors.gray[0],
//         },
//       }}
//       navbarOffsetBreakpoint="sm"
//       asideOffsetBreakpoint="sm"
//       navbar={<NavbarSimple />}

//       header={<HeaderResponsive links={links} />}
//     >
//       <App />
//     </AppShell>
//     </EditContextProvider>

//   )
// }

import { useDisclosure } from "@mantine/hooks"
import {
  ActionIconGroup,
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  Skeleton,
  useDirection,
} from "@mantine/core"
import { EditContextProvider } from "../../context/EditContext"
// import { MantineLogo } from '@mantine/ds';

import {
  IconBook,
  IconLogout,
  IconArticle,
  IconUser,
} from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import useEditContext from "../../context/useEditContext"
import useResourceContext from "../../context/useResourceContext"
import { useState } from "@wordpress/element"
import App from "./App"
import ToggleTheme from "./ToggleTheme"
import ToggleLanguage from "./ToggleLanguage"
import { Box } from "react-feather"
import { ThemeActionToggle } from "./ThemeActionToggle"
import { CrudContextProvider } from "../../context/CrudContext"

export function Shell() {
  const [opened, { toggle }] = useDisclosure()

  const { resourceName, setResourceName, setResourceHuman } =
    useResourceContext()
  const { setResource: setEditingResource } = useEditContext()
  const { t } = useTranslation()
  const data = [
    { link: "", label: "Books", icon: IconBook, name: "book" },
    { link: "", label: "Papers", icon: IconArticle, name: "paper" },
    { link: "", label: "About", icon: IconUser, name: "about" },
    { link: "", label: "Single Post", icon: IconUser, name: "singlepost" },
  ]
  const [active, setActive] = useState(resourceName)

  return (
    <CrudContextProvider>
      <AppShell
        header={{ height: 100 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header px={{ base: "sm", md: "xl" }}>
          <Flex
            justify="space-between"
            align="center"
            h="100%"
            direction="row-reverse"
          >
            <Group>
              <ThemeActionToggle />
              <ToggleLanguage />
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {data.map((item) => (
            <NavLink
              component="button"
              active={active === item.name}
              label={t(item.label)}
              rightSection={<item.icon size="1rem" stroke={1.5} />}
              key={item.label}
              h={28}
              mt="sm"
              animate={false}
              onClick={(event) => {
                event.preventDefault()
                if (resourceName !== item.name) {
                  setEditingResource(null)
                }
                setResourceName(item.name)
                setResourceHuman(item.label)
                setActive(item.name)
              }}
            />
          ))}
        </AppShell.Navbar>
        <AppShell.Main>
          <App />
        </AppShell.Main>
      </AppShell>
    </CrudContextProvider>
  )
}
