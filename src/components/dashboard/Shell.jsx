// import { AppShell, useMantineTheme } from "@mantine/core"
// import { NavbarSimple } from "./NavbarSimple"
// import { HeaderResponsive } from "./HeaderResponsive"
// import App from "./App"
// import { EditContextProvider } from "../../context/EditContext"

// const links = [
//   {
//     link: "/about",
//     label: "Features",
//   },
//   {
//     link: "/pricing",
//     label: "Pricing",
//   },
//   {
//     link: "/learn",
//     label: "Learn",
//   },
//   {
//     link: "/community",
//     label: "Community",
//   },
// ]

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
import { AppShell, Burger, Group, Skeleton } from "@mantine/core"
// import { MantineLogo } from '@mantine/ds';

export function Shell() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  )
}
