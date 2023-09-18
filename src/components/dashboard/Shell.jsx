import { AppShell, useMantineTheme } from "@mantine/core"
import { NavbarSimple } from "./NavbarSimple"
import { HeaderResponsive } from "./HeaderResponsive"
import App from "./App"
import { EditContextProvider } from "../../context/EditContext"

const links = [
  {
    link: "/about",
    label: "Features",
  },
  {
    link: "/pricing",
    label: "Pricing",
  },
  {
    link: "/learn",
    label: "Learn",
  },
  {
    link: "/community",
    label: "Community",
  },
]

export default function Shell() {
  const theme = useMantineTheme()
  return (
    <EditContextProvider>
    <AppShell
      fixed={false}
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarSimple />}

      header={<HeaderResponsive links={links} />}
    >
      <App />
    </AppShell>
    </EditContextProvider>

  )
}
