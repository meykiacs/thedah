import { useState } from "react"
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Text,
} from "@mantine/core"
import {
  IconBook,
  IconLogout,
  IconArticle,
  IconUser,
} from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import useResourceContext from "../../context/useResourceContext"
import useEditContext from "../../context/useEditContext"

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}))

export function NavbarSimple() {
  const { resourceName, setResourceName, setResourceHuman } = useResourceContext()
  const { setResource: setEditingResource } = useEditContext()
  const { t } = useTranslation()
  const data = [
    { link: "", label: "Books", icon: IconBook, name: "book" },
    { link: "", label: "Papers", icon: IconArticle, name: "paper" },
    { link: "", label: "About", icon: IconUser, name: "about" },
    { link: "", label: "Single Post", icon: IconUser, name: "blog" },
  ]

  const { classes, cx } = useStyles()
  const [active, setActive] = useState(resourceName)

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.name === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        if (resourceName !== item.name) {
          setEditingResource(null)
        }
        setResourceName(item.name)
        setResourceHuman(item.label)
        setActive(item.name)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{t(item.label)}</span>
    </a>
  ))

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text>{t("Dashboard")}</Text>
          {/* <MantineLogo size={28} /> */}
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  )
}

