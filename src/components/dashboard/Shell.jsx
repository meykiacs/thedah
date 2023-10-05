import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger, Flex, Group, NavLink } from "@mantine/core"

import { IconBook, IconArticle, IconUser } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import useResourceContext from "../../context/useResourceContext"
import { useState } from "@wordpress/element"
import App from "./App"
import ToggleLanguage from "./ToggleLanguage"
import { ThemeActionToggle } from "./ThemeActionToggle"
import {  useCrudContext } from "../../context/CrudContext"

export function Shell() {
  const [opened, { toggle }] = useDisclosure()

  const { resourceName, setResourceName, setResourceHuman } =
    useResourceContext()
  const { isEditing, images } = useCrudContext()
  const { t } = useTranslation()
  const data = [
    { link: "", label: "Books", icon: IconBook, name: "book" },
    { link: "", label: "Papers", icon: IconArticle, name: "paper" },
    { link: "", label: "About", icon: IconUser, name: "about" },
    { link: "", label: "Blog", icon: IconUser, name: "blog" },
    { link: "", label: "Course", icon: IconUser, name: "course" },
  ]
  const [active, setActive] = useState(resourceName)
  return (
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
            <ToggleLanguage disabled={isEditing || images.length > 0} />
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {data.map((item) => (
          <NavLink
            component="button"
            active={active === item.name}
            disabled={isEditing}
            label={t(item.label)}
            rightSection={<item.icon size="1rem" stroke={1.5} />}
            key={item.label}
            h={28}
            mt="sm"
            animate={false}
            onClick={(event) => {
              event.preventDefault()
              // if (resourceName !== item.name) {
              //   setEditingResource(null)
              // }
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
  )
}
