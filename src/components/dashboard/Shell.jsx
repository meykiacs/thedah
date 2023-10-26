import { useDisclosure } from "@mantine/hooks"
import {
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  Space,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core"

import {
  IconBook,
  IconArticle,
  IconUser,
  IconPencil,
  IconSchool,
  IconPhotoEdit,
  IconLogout,
  IconMailFast,
  IconSocial,
  IconMessageCircle2,
  IconQuote,
  IconPaint,
  IconFlower,
  IconPhotoExclamation,
} from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import useResourceContext from "../../context/useResourceContext"
import { useState } from "@wordpress/element"
import App from "./App"
import ToggleLanguage from "./ToggleLanguage"
import { ThemeActionToggle } from "./ThemeActionToggle"
import { useCrudContext } from "../../context/CrudContext"
import useWPContext from "../../context/useWPContext"
import SiteLogo from "../common/SiteLogo"

export function Shell() {
  const [opened, { toggle }] = useDisclosure()

  const { resourceName, setResourceName, setResourceHuman } =
    useResourceContext()
  const { logoutUrl, homeUrl } = useWPContext()
  const { isLocked } = useCrudContext()
  const { t } = useTranslation()
  const data = [
    { link: "", label: "Books", icon: IconBook, name: "book" },
    { link: "", label: "Papers", icon: IconArticle, name: "paper" },
    { link: "", label: "About", icon: IconUser, name: "about" },
    { link: "", label: "blogPosts", icon: IconPencil, name: "blog" },
    { link: "", label: "Courses", icon: IconSchool, name: "course" },
    { link: "", label: "Gallery", icon: IconPhotoEdit, name: "gallery" },
    { link: "", label: "Newsletter", icon: IconMailFast, name: "newsletter" },
    { link: "", label: "SocialNetwork", icon: IconSocial, name: "social" },
    { link: "", label: "Quotes", icon: IconQuote, name: "quote" },
    {
      link: "",
      label: "UnapprovedComments",
      icon: IconMessageCircle2,
      name: "unapprovedComments",
    },
    { link: "", label: "Slider", icon: IconPhotoExclamation, name: "slider" },
  ]
  const [active, setActive] = useState(resourceName)
  const colorScheme = useComputedColorScheme()

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
            <ToggleLanguage disabled={isLocked} />
          </Group>
          <a href={homeUrl}>
            <SiteLogo
              style={
                colorScheme === "dark"
                  ? { filter: "invert(1)", textAlign: "center" }
                  : {}
              }
            />
          </a>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {data.map((item) => (
          <NavLink
            component="button"
            active={active === item.name}
            disabled={isLocked}
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
        <Space h="xl" />
        <NavLink
          component="a"
          label={t("Logout")}
          rightSection={<IconLogout size="1rem" stroke={1.5} />}
          href={logoutUrl}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <App />
      </AppShell.Main>
    </AppShell>
  )
}
